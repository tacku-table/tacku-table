import { useEffect } from "react";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { dbService } from "./config/firebase";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const nextURL = request.nextUrl.pathname;
  console.log("nextURL:", nextURL);
  const splitURL = nextURL.split("/");
  console.log("splitURL:", splitURL);
  const id = splitURL[2];
  console.log("id:", id);

  const snap = await getDoc(doc(dbService, "recipe", id));
  if (snap.exists()) {
    return;
  } else {
    return NextResponse.redirect(
      new URL(
        "https://tacku-table-v1-flludcxgy-tacku-table.vercel.app/detailRecipePage",
        request.url
      )
    );
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher:
    "https://tacku-table-v1-flludcxgy-tacku-table.vercel.app/detailRecipePage/:path*",
};
