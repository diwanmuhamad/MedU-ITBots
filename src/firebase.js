import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAZ_o6IYOaVNho0yKFJEj1qedI5XY4E1Y4",
    authDomain: "med-u-1e0d3.firebaseapp.com",
    projectId: "med-u-1e0d3",
    storageBucket: "med-u-1e0d3.appspot.com",
    messagingSenderId: "969667934862",
    appId: "1:969667934862:web:523fd803d5092ac15ce7df"
  };

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDb = getFirestore(app);