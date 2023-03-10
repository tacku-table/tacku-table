import React from "react";
import packageJson from "package.json";
import Link from "next/link";

const Footer = () => {
  const { version } = packageJson;

  return (
    <div className="sm:py-8 py-4 bg-[#EBD8C3] w-screen flex flex-col justify-end text-mono100 mx-auto">
      <ul className="border-b border-white sm:pt-6  w-4/6 mx-auto pt-2">
        <li className="mb-4">
          <span className="mr-7 text-[8px] sm:text-xs">고객센터</span>
          <span className="text-sm sm:text-lg font-semibold ">
            takus@email.com
          </span>
        </li>
        <li className="mb-4 sm:text-xs text-[8px]">
          copyright © 타쿠의 식탁. All rights reserved.
        </li>
      </ul>
      <ul className="bottom-0 pt-4  pb-3 sm:pb-10 flex gap-7 text-xs w-4/6 mx-auto justify-between">
        <div className="space-y-1 md:flex md:items-center md:space-y-0 md:gap-x-10 xl:gap-x-16 text-[10px] sm:text-sm">
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
        <li className="text-[10px] sm:text-sm">v{version}</li>
      </ul>
    </div>
  );
};

export default Footer;
