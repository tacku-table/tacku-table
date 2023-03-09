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
      <div className="xl:w-11/12 md:w-max w-full sm:h-full flex justify-between sm:mx-auto items-center">
        <ul className="flex justify-center items-center">
          {/* 햄버거버튼 */}
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
                className="w-10 h-10  text-[#a3713d]"
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
              <div className="lg:hidden hidden md:block">
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
          {/* 글쓰기 버튼 */}
          <div className="relative right-6 flex items-stretch md:hidden text-[#4f3315] text-[13px]">
            <Link href="/recipeWrite">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-[#a3713d] mb-1 "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </Link>
          </div>
          {/* 모바일용 로고이미지 */}
          <div className="md:hidden items-center mb-3 lg:hidden sm:hidden ml-3">
            <Link href="/main" className="md:hidden">
              <Image
                src={logo2}
                alt="logo_web"
                width={150}
                height={40}
                priority
              />
            </Link>
          </div>

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
            className="lg:block md:block hidden mr-6 hover:text-mono80 hover:transition hover:ease-out hover:duration-300"
          >
            레시피 글쓰기
          </Link>
          {storageCurrentUser ? (
            <button
              type="button"
              onClick={logoutAction}
              className="mr-6 hover:text-mono80 hidden sm:block md:block lg:block hover:transition hover:ease-out hover:duration-300"
            >
              로그아웃
            </button>
          ) : (
            <button
              type="button"
              onClick={moveLoginPage}
              className="sorted-btn w-[60%] hidden sm:block md:block lg:block sm:w-[87px] md:w-[87px] lg:w-[87px] mr-1"
            >
              로그인
            </button>
          )}
          {/* 모바일 myPage 버튼 */}
          {storageCurrentUser && (
            <button
              type="button"
              onClick={() => moveMyPage(storageCurrentUser)}
              className="text-black sm:hidden md:hidden lg:hidden mb-4 sorted-btn w-[60%] border-none sm:w-[87px] md:w-[87px] lg:w-[87px] mr-3 mt-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-7 h-7 text-[#a3713d]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          )}

          {/* 모바일 로그인 버튼 */}
          {storageCurrentUser ? (
            // 로그인한 상태
            <button
              type="button"
              onClick={logoutAction}
              className="sm:hidden md:hidden lg:hidden mb-4 sorted-btn w-[60%] border-none sm:w-[87px] md:w-[87px] lg:w-[87px] mr-3 mt-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-7 h-7 text-[#a3713d]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
            </button>
          ) : (
            // 로그아웃한 상태
            <button
              type="button"
              onClick={moveLoginPage}
              className="sm:hidden md:hidden lg:hidden mb-4 sorted-btn w-[60%] border-none sm:w-[87px] md:w-[87px] lg:w-[87px] mr-3 mt-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-8 h-8 text-[#a3713d]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          )}

          {storageCurrentUser ? (
            <button
              onClick={() => moveMyPage(storageCurrentUser)}
              className="mr-6 hover:text-mono80 hidden sm:block md:block lg:block hover:transition hover:ease-out hover:duration-300"
              //   className="hover:text-mono80 hover:transition hover:ease-out hover:duration-300"
            >
              마이페이지
            </button>
          ) : (
            <Link
              href={{
                pathname: "/login",
                query: { headerstatus: "headerstatus" }, // array라 문자화
              }}
              className="pl-5 pt-[6px] sorted-btn w-[60%] hidden sm:block md:block lg:block sm:w-[87px] md:w-[87px] lg:w-[87px] mr-1"
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
