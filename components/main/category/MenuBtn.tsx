import React, { useRef, useState } from "react";
import DropdownCategory from "./DropdownCategory";

const MenuBtn = () => {
    const cls = (...classnames: string[]) => {
        return classnames.join(" ");
    };
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const menuToggle = () => {
        console.log("click");
        setShowMenu(!showMenu);
    };

    const dismissHandler = (
        event: React.FocusEvent<HTMLButtonElement>
    ): void => {
        if (event.currentTarget === event.target) {
            setShowMenu(false);
        }
    };

    return (
        <>
            <button
                onClick={menuToggle}
                className="cursor-pointer ml-[185px]"
                onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
                    dismissHandler(e)
                }
            >
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
            </button>
            <div
                className={cls(
                    "flex justify-between absolute top-[83px] w-full px-48 py-16 bg-slate-50 bg-opacity-50 rounded-sm shadow-2xl",
                    showMenu ? "" : "hidden"
                )}
            >
                {showMenu && (
                    <DropdownCategory
                        showMenu={false}
                        menuToggle={menuToggle}
                    />
                )}
            </div>
        </>
    );
};

export default MenuBtn;
