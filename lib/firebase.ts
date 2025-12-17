import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

// Use explicit Firebase config so builds don't depend on environment variables being set on the server
const firebaseConfig = {
    apiKey: "AIzaSyCvJU9j6PdMeiA04DGE_3zSqg1UXzB8wp0",
    authDomain: "zebaish-bedding.firebaseapp.com",
    projectId: "zebaish-bedding",
    storageBucket: "zebaish-bedding.firebasestorage.app",
    messagingSenderId: "867370953866",
    appId: "1:867370953866:web:d28b928f0fc2763326d173",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };
