import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 재희 firebase
const firebaseConfig = {
  apiKey: "AIzaSyDwf81KBJ6rlKDJRts_oq2aPPDfH8LL8aQ",
  authDomain: "test-3a207.firebaseapp.com",
  projectId: "test-3a207",
  storageBucket: "test-3a207.appspot.com",
  messagingSenderId: "713080381754",
  appId: "1:713080381754:web:3719f1abfc305e5b08b003",
};
// 채하
// const firebaseConfig = {
//     apiKey: "AIzaSyANw6jE7NE7yF6F8TYYJalVwD2FuOLTqJ0",
//     authDomain: "taku-e9992.firebaseapp.com",
//     projectId: "taku-e9992",
//     storageBucket: "taku-e9992.appspot.com",
//     messagingSenderId: "139053130279",
//     appId: "1:139053130279:web:ae70760c52da59bb6b2402",
// };
// 희진
// const firebaseConfig = {
//   apiKey: "AIzaSyBFhi7Jmsk4k6am9YVgAbX1kXT9lP1DbXE",
//   authDomain: "tackus-table.firebaseapp.com",
//   projectId: "tackus-table",
//   storageBucket: "tackus-table.appspot.com",
//   messagingSenderId: "805590679974",
//   appId: "1:805590679974:web:b7c7f1e094518b712b8f67",
// };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const authService = getAuth(app);
export const dbService = getFirestore(app);
export const storage = getStorage(app);
export const apiKey = firebaseConfig.apiKey;

// 구글
//export const providerGoogle = new GoogleAuthProvider();
