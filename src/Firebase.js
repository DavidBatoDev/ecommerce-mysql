import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBdgoCfe6oo_dM18CJi9Hi4XDVHZn08bY8",
  authDomain: "david-s-shop.firebaseapp.com",
  projectId: "david-s-shop",
  storageBucket: "david-s-shop.appspot.com",
  messagingSenderId: "456576713872",
  appId: "1:456576713872:web:657a9f08bbc45f261f0415",
  measurementId: "G-Z9CJVF5L1M"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db =  getFirestore(app);