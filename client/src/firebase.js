// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-auth-91422.firebaseapp.com",
    projectId: "mern-auth-91422",
    storageBucket: "mern-auth-91422.appspot.com",
    messagingSenderId: "435793996771",
    appId: "1:435793996771:web:e1462cdd0450dadeb28ed6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);