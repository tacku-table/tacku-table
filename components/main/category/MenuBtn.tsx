import React, { useRef, useState } from "react";
import DropdownCategory from "./DropdownCategory";

const MenuBtn = () => {
    const [showMenu, setShowMenu] = useState(false);
    const menuToggle = () => {
        setShowMenu(!showMenu);
    };

    const cls = (...classnames: string[]) => {
        return classnames.join(" ");
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
            <div
                className={cls(
                    "grid grid-cols-3 absolute top-[83px] w-full px-48 py-11 bg-slate-50 bg-opacity-50 rounded-sm shadow-md",
                    showMenu ? "" : ""
                )}
            >
                <DropdownCategory />
            </div>
        </>
    );
};

export default MenuBtn;
