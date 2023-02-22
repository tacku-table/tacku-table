import React from "react";

const Footer = () => {
    return (
        <div className="bg-[#FFF5F5] px-64 flex flex-col justify-start text-baseText">
            <ul className="border-b border-white pt-6">
                <li className="mb-4">
                    <span className="mr-7 w-[52px] h-[18px] text-xs">
                        고객센터
                    </span>
                    <span className="w-[280px] h-[43px] text-2xl font-bold">
                        takus@email.com
                    </span>
                </li>
                <li className="mb-4 w-[303px] h-[19px] text-xs">
                    copyright © 타쿠의 식당. All rights reserved.
                </li>
            </ul>
            <ul className="bottom-0 pt-4 pb-20 flex gap-7 text-xs">
                <li className="w-[52px] h-[18px]">이용약관</li>
                <li className="w-[108px] h-[18px]">개인정보 처리방침</li>
                <li className="w-[52px] h-[18px]">사이트맵</li>
                <li className="w-[52px] h-[18px]">고객지원</li>
            </ul>
        </div>
    );
};

export default Footer;
