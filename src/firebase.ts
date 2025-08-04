import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOjrYaRMl3e8ND5wl221YGW1iWX_eqo9w",
  authDomain: "sjcapitalinvestaa-backend.firebaseapp.com",
  projectId: "sjcapitalinvestaa-backend",
  storageBucket: "sjcapitalinvestaa-backend.firebasestorage.app",
  messagingSenderId: "550027332916",
  appId: "1:550027332916:web:6cbd50e33e3edc7fe6a961"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };