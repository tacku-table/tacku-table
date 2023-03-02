import Image from "next/image";
import React from "react";
import wrongPageImg from "../public/images/wrongPage.png";
const wrongPage = () => {
  return (
    <div className="flex flex-col my-auto items-center">
      <div className="text-center m-auto pt-[183px] pb-[184px]">
        <Image
          className="m-auto w-[240px] h-[181px] object-cover object-center"
          src={wrongPageImg}
          width={300}
          height={300}
          alt="잘못된 경로 요청입니다."
        />

        <h3 className="text-[24px] font-semibold mt-[29px]">
          죄송합니다. 해당 페이지를 찾을 수 없습니다.
        </h3>
        <p className="font-normal mt-[20px] leading-[30px]">
          찾을 수 없는 페이지 입니다. <br />
          존재하지 않는 주소를 입력하셨거나 <br />
          요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
        </p>
        <button
          onClick={() => {
            location.href = "/mainPage";
          }}
          type="button"
          className="mt-[24px] w-[100px] h-[36px] text-brand100 text-center text-[16px] border border-brand100 "
        >
          메인으로
        </button>
        <button
          onClick={() => {
            history.back();
          }}
          type="button"
          className="ml-[10px] w-[100px] h-[36px] text-brand100 text-center text-[16px] border border-brand100 "
        >
          이전페이지
        </button>
      </div>
    </div>
  );
};

export default wrongPage;
