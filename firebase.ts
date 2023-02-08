import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCs3OtP4bwHc4DzziKLIzM4vlJMhyuflEg",
    authDomain: "reactnative-dbdad.firebaseapp.com",
    databaseURL: "https://reactnative-dbdad-default-rtdb.firebaseio.com",
    projectId: "reactnative-dbdad",
    storageBucket: "reactnative-dbdad.appspot.com",
    messagingSenderId: "103307494325",
    appId: "1:103307494325:web:cb3f1b74c60ccc2bba8ffc",
};

export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storage = getStorage(app);
