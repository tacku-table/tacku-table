import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//배포용
// const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_KEY,
//     authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//     storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
//     messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
//     appId: process.env.NEXT_PUBLIC_APP_ID,
// };
const firebaseConfig = {
    apiKey: "AIzaSyAeZ8RkBEJcoOhVGoZc8mltIG2p4axysH8",
    authDomain: "taku-prac.firebaseapp.com",
    projectId: "taku-prac",
    storageBucket: "taku-prac.appspot.com",
    messagingSenderId: "273872805758",
    appId: "1:273872805758:web:3795f0f78c78b471ad9d2f",
};

let firebase;
if (!getApps().length) firebase = initializeApp(firebaseConfig);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const authService = getAuth(app);
export const dbService = getFirestore(app);
export const storage = getStorage(app);
