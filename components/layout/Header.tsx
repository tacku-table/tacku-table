import { authService } from "@/config/firebase";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import FoodCategory from "../main/category/FoodCategory";
import CookingTime from "../main/category/CookingTime";

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
        <div className="fixed top-0 z-50 w-full h-24 px-24 py-7 bg-white border-b border-grayText flex justify-between items-center">
            <ul className="flex justify-center items-center">
                <li className="px-3 py-7 hover:text-main hover:transition hover:ease-out hover:duration-300">
                    <Link href="/mainPage">타쿠의 테이블</Link>
                </li>
                <li className="px-3 py-7 hover:text-main hover:transition hover:ease-out hover:duration-300">
                    <Link href="/searchPage">전체 레시피</Link>
                </li>
                <FoodCategory />
                <CookingTime />
                <li className="px-3 py-7 hover:text-main hover:transition hover:ease-out hover:duration-300">
                    <Link href="/communityPage">커뮤니티</Link>
                </li>
            </ul>
            <div className="flex justify-center items-center">
                {storageCurrentUser ? (
                    <button type="button" onClick={logoutAction}>
                        로그아웃
                    </button>
                ) : (
                    <a href="/loginPage">로그인</a>
                )}
                <Link href="/myPage">마이페이지</Link>
            </div>
        </div>
    );
};

export default Header;
