import {getAuth , GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "sanpcart-7bf9d.firebaseapp.com",
  projectId: "sanpcart-7bf9d",
  storageBucket: "sanpcart-7bf9d.firebasestorage.app",
  messagingSenderId: "128755607133",
  appId: "1:128755607133:web:f7f9483e7b813328418fb4",
  measurementId: "G-8SREZ7XC8F"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export  {auth , provider};