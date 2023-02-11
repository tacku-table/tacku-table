import Link from "next/link";
import React from "react";
import DropdownMenu from "../category/DropdownMenu";
import MenuBtn from "../category/MenuBtn";

const Header = () => {
    return (
        <div className="flex py-7 justify-between items-center relative">
            <MenuBtn />
            {/* <DropdownMenu /> */}
            <div className="space-x-3 mr-36">
                <Link href="/mainPage">메인페이지</Link>
                <Link href="/communityPage">커뮤니티</Link>
                {/* 로그인/로그아웃 토글 설정 필요합니다. */}
                <Link href="/loginPage">로그인</Link>
                <Link href="/myPage">마이페이지</Link>
            </div>
        </div>
    );
};

export default Header;
