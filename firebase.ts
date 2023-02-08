// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKVOAQVuHCId2KTKdPFbzNvLpp8TXrLsU",
  authDomain: "tacku-table-private.firebaseapp.com",
  projectId: "tacku-table-private",
  storageBucket: "tacku-table-private.appspot.com",
  messagingSenderId: "351669114811",
  appId: "1:351669114811:web:769e3f58dc6fd33b9d169e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
