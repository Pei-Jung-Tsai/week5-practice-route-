// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwaVxeqgdybuILvFiaXlGkRvz_eHYvneQ",
  authDomain: "week7-pei-jung.firebaseapp.com",
  projectId: "week7-pei-jung",
  storageBucket: "week7-pei-jung.firebasestorage.app",
  messagingSenderId: "635680754049",
  appId: "1:635680754049:web:69b59f9c25c190da630080"
};

// Initialize Firebase
 initializeApp(firebaseConfig);
 const db = getFirestore();
export default db;