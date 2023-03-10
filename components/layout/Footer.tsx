import React from "react";
import packageJson from "package.json";
import Link from "next/link";

const Footer = () => {
    const { version } = packageJson;

    return (
        <div className="bg-[#EBD8C3] w-full flex flex-col justify-start text-mono100 mx-auto  text-xs">
            <ul className="border-b border-white pt-3 md:pt-6 w-4/6 mx-auto">
                <li className="mb-4">
                    <span className="mr-7">고객센터</span>
                    <span className="text-sm font-medium md:font-semibold">
                        takus@email.com
                    </span>
                </li>
                <li className="mb-4 hidden md:block">
                    copyright © 타쿠의 식당. All rights reserved.
                </li>
            </ul>
            <ul className="bottom-0 pt-4 pb-5 md:pb-10 flex gap-7 w-4/6 mx-auto justify-between">
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
