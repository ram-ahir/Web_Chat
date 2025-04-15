// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyVXzFwda1-92pPmigd7Vlpyk3Y59nK2o",
  authDomain: "web-chat-72165.firebaseapp.com",
  projectId: "web-chat-72165",
  storageBucket: "web-chat-72165.firebasestorage.app",
  messagingSenderId: "674877813719",
  appId: "1:674877813719:web:62e4bae71c439ec53c1192",
  measurementId: "G-0DSFZRQ8YN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);