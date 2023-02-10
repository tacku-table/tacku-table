import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

//다경 설정으로 되어있어요
const firebaseConfig = {
  apiKey: "AIzaSyC1Z5Sl0P_WuafG-4Fgx08TeKD1KzSAjFU",
  authDomain: "tacku-table.firebaseapp.com",
  projectId: "tacku-table",
  storageBucket: "tacku-table.appspot.com",
  messagingSenderId: "470777376989",
  appId: "1:470777376989:web:ed93c811f68a6dd2ee2b34",
};

export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storage = getStorage(app);

// 채하님꺼
// const firebaseConfig = {
//     apiKey: "AIzaSyCs3OtP4bwHc4DzziKLIzM4vlJMhyuflEg",
//     authDomain: "reactnative-dbdad.firebaseapp.com",
//     databaseURL: "https://reactnative-dbdad-default-rtdb.firebaseio.com",
//     projectId: "reactnative-dbdad",
//     storageBucket: "reactnative-dbdad.appspot.com",
//     messagingSenderId: "103307494325",
//     appId: "1:103307494325:web:cb3f1b74c60ccc2bba8ffc",
// };

// 다경님꺼
// const firebaseConfig = {
//     apiKey: "AIzaSyC1Z5Sl0P_WuafG-4Fgx08TeKD1KzSAjFU",
//     authDomain: "tacku-table.firebaseapp.com",
//     projectId: "tacku-table",
//     storageBucket: "tacku-table.appspot.com",
//     messagingSenderId: "470777376989",
//     appId: "1:470777376989:web:ed93c811f68a6dd2ee2b34",
//   };
