import { initializeApp } from "firebase/app";
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

// 채하님꺼
// const firebaseConfig = {
//     apiKey: "AIzaSyANw6jE7NE7yF6F8TYYJalVwD2FuOLTqJ0",
//     authDomain: "taku-e9992.firebaseapp.com",
//     projectId: "taku-e9992",
//     storageBucket: "taku-e9992.appspot.com",
//     messagingSenderId: "139053130279",
//     appId: "1:139053130279:web:ae70760c52da59bb6b2402",
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

//     apiKey: "AIzaSyDKVOAQVuHCId2KTKdPFbzNvLpp8TXrLsU",
//     authDomain: "tacku-table-private.firebaseapp.com",
//     projectId: "tacku-table-private",
//     storageBucket: "tacku-table-private.appspot.com",
//     messagingSenderId: "351669114811",
//     appId: "1:351669114811:web:769e3f58dc6fd33b9d169e",
// };

// 다경님꺼2
// const firebaseConfig = {
//   apiKey: "AIzaSyB_o07bi777IxMsKkBeNfOKZFHy-nKJ1gc",
//   authDomain: "testtest-9c70b.firebaseapp.com",
//   projectId: "testtest-9c70b",
//   storageBucket: "testtest-9c70b.appspot.com",
//   messagingSenderId: "472171635233",
//   appId: "1:472171635233:web:b539b40ca52e9b52d23960",
// };

// 희진
// const firebaseConfig = {
//     apiKey: "AIzaSyDKVOAQVuHCId2KTKdPFbzNvLpp8TXrLsU",
//     authDomain: "tacku-table-private.firebaseapp.com",
//     projectId: "tacku-table-private",
//     storageBucket: "tacku-table-private.appspot.com",
//     messagingSenderId: "351669114811",
//     appId: "1:351669114811:web:769e3f58dc6fd33b9d169e",
// };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const authService = getAuth(app);
export const dbService = getFirestore(app);
export const storage = getStorage(app);
