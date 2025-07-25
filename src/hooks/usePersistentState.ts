import { useState, useEffect, Dispatch, SetStateAction } from 'react';

/**
 * A custom React hook that uses `useState` but persists the state to `localStorage`.
 * It ensures that the state is preserved across page reloads and browser sessions.
 * @param key The unique key to use for storing the value in localStorage.
 * @param initialValue The initial value to use if no value is found in localStorage.
 * @returns A stateful value, and a function to update it, exactly like `useState`.
 */
function usePersistentState<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    // This function is only executed on the initial render to get the initial state.
    try {
      // This code only runs on the client, avoiding issues with server-side rendering.
      const storedValue = window.localStorage.getItem(key);
      // If a value is found in localStorage, parse it. Otherwise, use the initial value.
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    // This effect runs whenever the state changes to update localStorage.
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Error setting localStorage key “${key}”:`, error);
    }
  }, [key, state]);

  return [state, setState];
}

export default usePersistentState;