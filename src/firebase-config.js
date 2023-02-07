// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQPVVwPe71hKZGFmZzSaOjZnQ3S8kES7U",
  authDomain: "chatapp-3eda0.firebaseapp.com",
  projectId: "chatapp-3eda0",
  storageBucket: "chatapp-3eda0.appspot.com",
  messagingSenderId: "753162098212",
  appId: "1:753162098212:web:310d177bc29fdf19ebaab1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);