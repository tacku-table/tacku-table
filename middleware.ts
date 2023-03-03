import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
  };

  const app = initializeApp(firebaseConfig);
  const dbService = getFirestore(app);

  const nextURL = request.nextUrl.pathname;
  const splitURL = nextURL.split("/");
  const id = splitURL[2];
  try {
    console.log("id:", id);
    if (id) {
      const snap = await getDoc(doc(dbService, "recipe", id));
      if (snap.exists()) {
        return;
      } else {
        return NextResponse.redirect(new URL("/deletePage", request.url));
      }
    } else {
      return;
    }
  } catch (error) {
    console.log("error:", error);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/detailRecipePage/:path*",
};

// import { initializeApp, getApps } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// //배포용
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_KEY,
//   authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_APP_ID,
// };

// let firebase;
// if (!getApps().length) firebase = initializeApp(firebaseConfig);

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const authService = getAuth(app);
// export const dbService = getFirestore(app);
// export const storage = getStorage(app);
