import React from "react";
import packageJson from "package.json";
import Link from "next/link";

const Footer = () => {
    const { version } = packageJson;

    return (
        // 후보 : #FFF8F0 ,#FFF6E8
        // 푸터로 괜찮은애 :#FFF8F0
        // 레시피 배경색 : #FFF7E6
        <div className="bg-[#FFF8F0] w-full flex flex-col justify-start text-mono100 mx-auto">
            <ul className="border-b border-white pt-6 w-4/6 mx-auto">
                <li className="mb-4">
                    <span className="mr-7 text-xs">고객센터</span>
                    <span className="text-xl font-bold">takus@email.com</span>
                </li>
                <li className="mb-4 text-xs">
                    copyright © 타쿠의 식당. All rights reserved.
                </li>
            </ul>
            <ul className="bottom-0 pt-4 pb-20 flex gap-7 text-xs w-4/6 mx-auto justify-between">
                <div className="space-y-1 md:flex md:items-center md:space-y-0 md:gap-x-10 xl:gap-x-16">
                    <li>
                        <Link href="/intro">사이트소개</Link>
                    </li>
                    <li>
                        <Link href="/intro/termsOfService">이용약관</Link>
                    </li>
                    <li>
                        <Link href="/intro/privacy">개인정보 처리방침</Link>
                    </li>
                </div>
                <li>v{version}</li>
            </ul>
        </div>
    );
};

export default Footer;
