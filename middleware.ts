import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { dbService } from "./config/firebase";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const nextURL = request.nextUrl.pathname;
  const splitURL = nextURL.split("/");
  const id = splitURL[2];

  const snap = await getDoc(doc(dbService, "recipe", id));
  if (snap.exists()) {
    return;
  } else {
    return NextResponse.redirect(new URL("/deletePage", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/detailRecipePage/:path*",
};
