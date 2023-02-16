import { authService } from "@/config/firebase";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MenuBtn from "../main/category/MenuBtn";
import { signOut } from "firebase/auth";

const Header = () => {
    const [storageCurrentUser, setStorageCurrentUser] = useState("");

    useEffect(() => {
        const user = sessionStorage.getItem("User") || "";
        setStorageCurrentUser(user);
    }, []);
    const logoutAction = () => {
        signOut(authService)
            .then(() => {
                sessionStorage.clear();
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
                {storageCurrentUser ? (
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
};

export default Header;
