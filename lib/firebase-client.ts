import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Use explicit Firebase config so builds don't depend on environment variables being set on the server
const firebaseConfig = {
    apiKey: "AIzaSyCvJU9j6PdMeiA04DGE_3zSqg1UXzB8wp0",
    authDomain: "zebaish-bedding.firebaseapp.com",
    projectId: "zebaish-bedding",
    storageBucket: "zebaish-bedding.firebasestorage.app",
    messagingSenderId: "867370953866",
    appId: "1:867370953866:web:d28b928f0fc2763326d173",
};

// Initialize Firebase (guard against re‑initialization)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
export const db = getFirestore(app);
