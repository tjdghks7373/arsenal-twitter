import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCCyBKXQw-9GCpxHfhpLJGtivrMw1GPDbM",
    authDomain: "arsenal-twitter.firebaseapp.com",
    projectId: "arsenal-twitter",
    storageBucket: "arsenal-twitter.firebasestorage.app",
    messagingSenderId: "205981316941",
    appId: "1:205981316941:web:5a68f41d8916d38d1a2904",
    measurementId: "G-MN52KVCZJW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);