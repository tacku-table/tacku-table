import Link from "next/link";
import React, { useEffect, useState } from "react";

type DropDownProps = {
    showMenu: boolean;
    menuToggle: Function;
};

const DropdownCategory: React.FC<DropDownProps> = () => {
    const [showMenu, setShowMenu] = useState<boolean>(false);

    useEffect(() => {
        setShowMenu(showMenu);
    }, [showMenu]);

    return (
        <>
            <div className="flex items-center z-50">
                <p className="border-b border-black text-lg font-extrabold py-2">
                    조리시간
                </p>
                <div className="ml-20 space-y-4 font-medium">
                    <li>
                        <Link legacyBehavior href={`/searchPage/15분이하`}>
                            <a>15분이하</a>
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href={`/searchPage/30분이하`}>
                            <a>30분이하</a>
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href={`/searchPage/1시간이하`}>
                            <a>1시간이하</a>
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href={`/searchPage/1시간이상`}>
                            <a>1시간이상</a>
                        </Link>
                    </li>
                </div>
            </div>
            <div className="flex items-center z-50">
                <p className="border-b border-black text-lg font-extrabold py-2">
                    음식종류
                </p>
                <ul className="ml-20 space-y-4 font-medium">
                    <li>
                        <Link legacyBehavior href={`/searchPage/밥&도시락&면`}>
                            <a>밥/도시락/면</a>
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href={`/searchPage/국&탕&찌개`}>
                            <a>국/탕/찌개</a>
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href={`/searchPage/구이&볶음&찜`}>
                            <a>구이/볶음/찜</a>
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href={`/searchPage/튀김류`}>
                            <a>튀김류</a>
                        </Link>
                    </li>
                    <li>
                        <Link
                            legacyBehavior
                            href={`/searchPage/베이커리&디저트`}
                        >
                            <a>베이커리/디저트</a>
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href={`/searchPage/음료&주류`}>
                            <a>음료/주류</a>
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href={`/searchPage/식단&건강관리`}>
                            <a>식단/건강관리</a>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="flex items-center ml-7">
                <p className="border-b border-black text-lg font-extrabold py-2">
                    Best 5
                </p>
                <ul className="ml-20 space-y-4 font-medium">
                    <li>하울음식</li>
                    <li>하울음식</li>
                    <li>하울음식</li>
                    <li>하울음식</li>
                    <li>하울음식</li>
                </ul>
            </div>
        </>
    );
};

export default DropdownCategory;
