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
            <div className="flex items-center">
                <p className="border-b border-black text-lg font-extrabold py-2">
                    조리시간
                </p>
                <ul className="ml-20 space-y-4 font-medium">
                    <li>15분</li>
                    <li>30분</li>
                    <li>1시간</li>
                </ul>
            </div>
            <div className="flex items-center">
                <p className="border-b border-black text-lg font-extrabold py-2">
                    음식종류
                </p>
                <ul className="ml-20 space-y-4 font-medium">
                    <li>밥/도시락/면</li>
                    <li>국/탕/찌개</li>
                    <li>구이/볶음/찜</li>
                    <li>튀김류</li>
                    <li>베이커리/디저트</li>
                    <li>음료/주류</li>
                    <li>식단/건강관리</li>
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
