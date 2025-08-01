import { useState, useEffect, Dispatch, SetStateAction } from 'react';

// Define the options for the hook
interface PersistentStateOptions {
  storage?: 'localStorage' | 'sessionStorage';
  ttl?: number; // Time to live in milliseconds
}

/**
 * A custom React hook that uses `useState` but persists the state to web storage.
 * It can use either localStorage or sessionStorage, and supports a TTL for localStorage.
 * @param key The unique key for the storage.
 * @param initialValue The initial value if nothing is stored.
 * @param options Configuration for storage type and TTL.
 * @returns A stateful value and a function to update it.
 */
function usePersistentState<T>(
  key: string,
  initialValue: T,
  options: PersistentStateOptions = {}
): [T, Dispatch<SetStateAction<T>>] {
  const { storage = 'localStorage', ttl } = options;
  const storageArea = storage === 'sessionStorage' ? window.sessionStorage : window.localStorage;

  const [state, setState] = useState<T>(() => {
    try {
      const storedItem = storageArea.getItem(key);
      if (!storedItem) return initialValue;

      const item = JSON.parse(storedItem);

      // If using localStorage with TTL, check if the item has expired
      if (storage === 'localStorage' && ttl) {
        const now = new Date().getTime();
        if (now > item.expiry) {
          storageArea.removeItem(key);
          return initialValue;
        }
        return item.value;
      }

      return item;
    } catch (error) {
      console.error(`Error reading storage key “${key}”:`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      let itemToStore;
      // If using localStorage with TTL, wrap the state in an object with an expiry timestamp
      if (storage === 'localStorage' && ttl) {
        const now = new Date().getTime();
        itemToStore = {
          value: state,
          expiry: now + ttl,
        };
      } else {
        itemToStore = state;
      }
      storageArea.setItem(key, JSON.stringify(itemToStore));
    } catch (error) {
      console.error(`Error setting storage key “${key}”:`, error);
    }
  }, [key, state, storageArea, ttl, storage]);

  return [state, setState];
}

export default usePersistentState;
