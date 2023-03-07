import { authService } from "@/config/firebase";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import FoodCategory from "../mainPage/category/FoodCategory";
import CookingTime from "../mainPage/category/CookingTime";
import logo2 from "../../public/images/logo2.png";
import Image from "next/image";
import { toast } from "react-toastify";
import { setTimeout } from "timers";
import { useRouter } from "next/router";

export const clearStorage = () => {
  sessionStorage.removeItem("filteredFoodData");
  sessionStorage.removeItem("filteredTimeData");
  sessionStorage.removeItem("searchData");
  sessionStorage.removeItem("userWatching");
};

const Header = () => {
  const [storageCurrentUser, setStorageCurrentUser] = useState("");
  const toastAlert = (alertText: string) => {
    toast(`${alertText}`, {
      position: "top-right",
      autoClose: 1300,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const logoutAction = () => {
    signOut(authService)
      .then(() => {
        sessionStorage.clear();
        toastAlert("로그아웃 성공!");
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
  const router = useRouter();
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
      className="fixed top-0 z-50 w-full sm:h-[84px] h-36  sm:px-10 px-0 bg-white border-b-[1.5px] border-mono50 items-center text-sm"
      onClick={clearStorage}
    >
      <div className="2xl:w-[1700px] sm:w-[1200px] w-full sm:h-full flex sm:justify-between justify-center sm:mx-auto mx-2 sm:flex-nowrap flex-wrap items-center">
        <ul className="flex justify-center items-center ">
          <li className="header-title">
            <Link href="/main">
              <Image
                src={logo2}
                alt="logo_web"
                width={155}
                height={38}
                priority
              />
            </Link>
          </li>
          <li
            onClick={clearStorageAndShowTotal}
            className="header-title cursor-pointer"
          >
            전체 레시피
          </li>
          <FoodCategory />
          <CookingTime />
          <li className="header-title cursor-pointer ">
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
        </div>
      </div>
    </div>
  );
};

export default Header;
