// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBfl9Atxusi5Pa5yBfxCTCne-9YMDNFljg",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "proevorn.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "proevorn",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "proevorn.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "534449282672",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:534449282672:web:805dad511e78d39a4ddeb5",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-5Z5H3JP8MH",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
