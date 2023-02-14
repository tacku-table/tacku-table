import { authService } from "@/config/firebase";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MenuBtn from "../main/category/MenuBtn";
import { signOut } from "firebase/auth";

const Header = () => {
<<<<<<< HEAD
  return (
    <div className="flex py-7 justify-between items-center relative">
      <MenuBtn />
      <Link href="/mainPage" className="font-semibold">
        타쿠의 테이블
      </Link>
      <div className="space-x-10 mr-[185px] text-sm font-semibold">
        <Link href="/communityPage">커뮤니티</Link>
        {/* 로그인/로그아웃 토글 설정 필요합니다. */}
        <Link href="/loginPage">로그인</Link>
        <Link href="/myPage">마이페이지</Link>
      </div>
    </div>
  );
=======
    const logoutAction = () => {
        signOut(authService)
            .then(() => {
                localStorage.clear();
                alert("로그아웃 성공!");
                location.reload();
            })
            .catch((error) => {
                console.log("error:", error);
            });
    };

    return (
        <div className="flex py-7 justify-between items-center relative">
            <MenuBtn />
            <Link href="/mainPage" className="font-semibold">
                타쿠의 테이블
            </Link>
            <div className="space-x-10 mr-[185px] text-sm font-semibold">
                <Link href="/communityPage">커뮤니티</Link>
                {/* 로그인/로그아웃 토글 설정 필요합니다. */}
                {authService.currentUser ? (
                    <button type="button" onClick={logoutAction}>
                        로그아웃
                    </button>
                ) : (
                    <Link href="/loginPage">로그인</Link>
                )}

                <Link href="/myPage">마이페이지</Link>
            </div>
        </div>
    );
>>>>>>> baf39cc666481744d870f486aeaebe5c83c2894e
};

export default Header;
