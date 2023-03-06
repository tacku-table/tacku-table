import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//배포용
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_KEY,
//   authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_APP_ID,
// };

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
//     apiKey: "AIzaSyCs3OtP4bwHc4DzziKLIzM4vlJMhyuflEg",
//     authDomain: "reactnative-dbdad.firebaseapp.com",
//     databaseURL: "https://reactnative-dbdad-default-rtdb.firebaseio.com",
//     projectId: "reactnative-dbdad",
//     storageBucket: "reactnative-dbdad.appspot.com",
//     messagingSenderId: "103307494325",
//     appId: "1:103307494325:web:cb3f1b74c60ccc2bba8ffc",
// };

// 다경
// const firebaseConfig = {
//     apiKey: "AIzaSyC1Z5Sl0P_WuafG-4Fgx08TeKD1KzSAjFU",
//     authDomain: "tacku-table.firebaseapp.com",
//     projectId: "tacku-table",
//     storageBucket: "tacku-table.appspot.com",
//     messagingSenderId: "470777376989",
//     appId: "1:470777376989:web:ed93c811f68a6dd2ee2b34",
//   };

// 희진
// const firebaseConfig = {
//   apiKey: "AIzaSyBFhi7Jmsk4k6am9YVgAbX1kXT9lP1DbXE",
//   authDomain: "tackus-table.firebaseapp.com",
//   projectId: "tackus-table",
//   storageBucket: "tackus-table.appspot.com",
//   messagingSenderId: "805590679974",
//   appId: "1:805590679974:web:b7c7f1e094518b712b8f67",
// };

let firebase;
if (!getApps().length) firebase = initializeApp(firebaseConfig);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const authService = getAuth(app);
export const dbService = getFirestore(app);
export const storage = getStorage(app);
