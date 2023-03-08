import { authService } from "@/config/firebase";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import FoodCategory from "../mainPage/category/FoodCategory";
import CookingTime from "../mainPage/category/CookingTime";
import logo2 from "../../public/images/logo2.png";
import logo22 from "../../public/images/logo2-2.png";
import Image from "next/image";
import { setTimeout } from "timers";
import Sidebar from "./Sidebar";
import { Success } from "../toastify/Alert";

export const clearStorage = () => {
    sessionStorage.removeItem("filteredFoodData");
    sessionStorage.removeItem("filteredTimeData");
    sessionStorage.removeItem("searchData");
    sessionStorage.removeItem("userWatching");
};

const Header = () => {
    const [headerSideBar, setHeaderSideBar] = useState<boolean>(false);
    const [storageCurrentUser, setStorageCurrentUser] = useState("");
    const logoutAction = () => {
        signOut(authService)
            .then(() => {
                sessionStorage.clear();
                Success("로그아웃 성공!");
                setTimeout(() => {
                    location.reload();
                }, 2000);
            })
            .catch((error) => {
                console.log("error:", error);
            });
    };
    const moveLoginPage = () => {
        location.href = "/login";
    };
    // 마이페이지
    const moveMyPage = (currentUser: string) => {
        const { uid } = JSON.parse(currentUser);
        location.href = `/profile/${uid}`;
    };

    const clearStorageAndShowTotal = () => {
        sessionStorage.removeItem("filteredFoodData");
        sessionStorage.removeItem("filteredTimeData");
        sessionStorage.removeItem("searchData");
        window.location.replace("/search");
    };
    useEffect(() => {
        const user = sessionStorage.getItem("User") || "";
        setStorageCurrentUser(user);
    }, []);

    return (
        <div
            className="fixed top-0 z-50 w-full h-[84px] xl:px-10 px-0 bg-white border-b-[1.5px] border-mono50 items-center text-sm"
            onClick={clearStorage}
        >
            <div className="xl:w-11/12 md:w-max w-full sm:h-full flex justify-between  sm:mx-auto mx-2 items-center">
                <ul className="flex justify-center items-center ">
                    <li className="header-title">
                        <button
                            onClick={() => {
                                setHeaderSideBar(!headerSideBar);
                            }}
                            className="md:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        </button>
                    </li>
                    <li className="header-title">
                        <Link href="/main">
                            <div className="lg:block hidden">
                                <Image
                                    src={logo2}
                                    alt="logo_web"
                                    width={155}
                                    height={38}
                                    priority
                                />
                            </div>
                            <div className="lg:hidden">
                                <Image
                                    src={logo22}
                                    alt="logo_web"
                                    width={60}
                                    height={80}
                                    priority
                                />
                            </div>
                        </Link>
                    </li>
                    <li
                        onClick={clearStorageAndShowTotal}
                        className="header-title cursor-pointer md:block hidden"
                    >
                        전체 레시피
                    </li>
                    <div className=" md:block hidden">
                        <FoodCategory />
                    </div>
                    <div className=" md:block hidden">
                        <CookingTime />
                    </div>
                    <li className="header-title cursor-pointer md:block hidden">
                        <Link href="/community">커뮤니티</Link>
                    </li>
                </ul>
                <div className="flex justify-center items-center">
                    <Link
                        href="/recipeWrite"
                        className="mr-6 hover:text-mono80 hover:transition hover:ease-out hover:duration-300"
                    >
                        레시피글쓰기
                    </Link>
                    {storageCurrentUser ? (
                        <button
                            type="button"
                            onClick={logoutAction}
                            className="mr-6 hover:text-mono80 hover:transition hover:ease-out hover:duration-300"
                        >
                            로그아웃
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={moveLoginPage}
                            className="sorted-btn mr-2"
                        >
                            로그인
                        </button>
                    )}
                    {storageCurrentUser ? (
                        <button
                            onClick={() => moveMyPage(storageCurrentUser)}
                            className="hover:text-mono80 hover:transition hover:ease-out hover:duration-300"
                        >
                            마이페이지
                        </button>
                    ) : (
                        <Link
                            href={{
                                pathname: "/login",
                                query: { headerstatus: "headerstatus" }, // array라 문자화
                            }}
                            className="sorted-btn"
                        >
                            회원가입
                        </Link>
                    )}
                    {headerSideBar ? <Sidebar /> : null}
                </div>
            </div>
        </div>
    );
};

export default Header;
