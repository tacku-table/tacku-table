import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 재희 firebase
//const firebaseConfig = {
 // apiKey: "AIzaSyDwf81KBJ6rlKDJRts_oq2aPPDfH8LL8aQ",
 // authDomain: "test-3a207.firebaseapp.com",
 // projectId: "test-3a207",
 // storageBucket: "test-3a207.appspot.com",
//messagingSenderId: "713080381754",
 // appId: "1:713080381754:web:3719f1abfc305e5b08b003",
//};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const authService = getAuth(app);
export const dbService = getFirestore(app);
