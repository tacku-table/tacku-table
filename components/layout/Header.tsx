import { authService } from "@/config/firebase";
import Link from "next/link";
import React from "react";
import MenuBtn from "../main/category/MenuBtn";

const Header = () => {
    return (
        <div className="flex py-7 justify-between items-center relative">
            <MenuBtn />
            <Link href="/mainPage" className="font-semibold">
                타쿠의 테이블
            </Link>
            <div className="space-x-10 mr-[185px] text-sm font-semibold">
                <Link href="/communityPage">커뮤니티</Link>
                {/* {authService.currentUser ? (
                    <div>로그아웃</div>
                ) : ( */}
                <Link href="/loginPage">로그인</Link>
                {/* )} */}
                <Link href="/myPage">마이페이지</Link>
            </div>
        </div>
    );
};

export default Header;
