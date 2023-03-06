import React from "react";
import packageJson from "package.json";

const Footer = () => {
  const { version } = packageJson;

  return (
    <div className="bg-[#FFF5F5] flex flex-col justify-start text-mono100">
      <ul className="border-b border-white pt-6 w-4/6 mx-auto">
        <li className="mb-4">
          <span className="mr-7 w-[52px] h-[18px] text-xs">고객센터</span>
          <span className="w-[280px] h-[43px] text-xl font-bold">
            takus@email.com
          </span>
        </li>
        <li className="mb-4 w-[303px] h-[19px] text-xs">
          copyright © 타쿠의 식당. All rights reserved.
        </li>
      </ul>
      <ul className="bottom-0 pt-4 pb-20 flex gap-7 text-xs w-4/6 mx-auto">
        <li className="w-[52px] h-[18px]">이용약관</li>
        <li className="w-[108px] h-[18px]">개인정보 처리방침</li>
        <li className="w-[52px] h-[18px]">사이트맵</li>
        <li className="w-[52px] h-[18px]">고객지원</li>
        <li className="w-[52px] h-[18px]">v{version}</li>
      </ul>
    </div>
  );
};

export default Footer;
