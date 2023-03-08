import React from "react";
import Link from "next/link";
import FoodCategory from "../mainPage/category/FoodCategory";
import CookingTime from "../mainPage/category/CookingTime";

function Sidebar() {
  const clearStorageAndShowTotal = () => {
    sessionStorage.removeItem("filteredFoodData");
    sessionStorage.removeItem("filteredTimeData");
    sessionStorage.removeItem("searchData");
    window.location.replace("/search");
  };
  return (
    <div className="bg-mono40 absolute top-[84px] right-0 w-full flex text-center">
      <li
        onClick={clearStorageAndShowTotal}
        className="header-title cursor-pointer "
      >
        전체 레시피
      </li>
      <FoodCategory />
      <CookingTime />
      <li className="header-title cursor-pointer">
        <Link href="/community">커뮤니티</Link>
      </li>
    </div>
  );
}

export default Sidebar;
