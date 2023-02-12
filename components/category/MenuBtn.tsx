import React, { useRef, useState } from "react";

const MenuBtn = () => {
    const [showMenu, setShowMenu] = useState(false);
    const menuToggle = () => {
        setShowMenu(!showMenu);
    };

    return (
        <>
            <div onClick={menuToggle} className="cursor-pointer ml-[185px]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-7 h-7"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
            </div>
            {/* {showMenu ? (
                <div className="grid grid-cols-3 absolute top-[83px] bg-slate-50 border border-gray-300 rounded-sm shadow-md">
                    <ul className="flex flex-col items-center">
                        <p className="border-b border-black text-lg font-bold">
                            조리시간
                        </p>
                        <li>15분</li>
                        <li>30분</li>
                        <li>1시간</li>
                    </ul>
                    <ul className="flex flex-col items-center">
                        <p className="border-b border-black text-lg font-bold">
                            음식종류
                        </p>
                        <li>밥/도시락/면</li>
                        <li>국/탕/찌개</li>
                        <li>구이/볶음/찜</li>
                        <li>튀김류</li>
                        <li>베이커리/디저트</li>
                        <li>음료/주류</li>
                        <li>식단/건강관리</li>
                    </ul>
                    <ul className="flex flex-col items-center">
                        <p className="border-b border-black text-lg font-bold">
                            베스트5
                        </p>
                        <li>하울음식</li>
                        <li>하울음식</li>
                        <li>하울음식</li>
                        <li>하울음식</li>
                        <li>하울음식</li>
                    </ul>
                </div>
            ) : (
                <div>안보임</div>
            )} */}
        </>
    );
};

export default MenuBtn;
