import type { NextPage } from "next";
import Image from "next/image";
import logo2 from "../../public/images/logo2.png";
import Seo from "../../components/layout/Seo";

const App: NextPage = () => {
  return (
    <div className="w-full md:w-2/3 lg:w-4/6 xl:w-1/2 mx-auto p-20">
      <Seo title="타쿠의 식탁 소개" />
      <h3 className="mb-10 font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-[#e95318f7] to-[#fce343]">
        &#35; About us
      </h3>
      <div className="flex flex-col justify-center items-center space-y-7">
        <Image width={500} height={250} alt="logo_image" src={logo2} />
        <div className="mt-10">
          <p>
            타쿠의 식탁은 프론트엔드 개발자 4명이 만든 사용자 공유형
            애니메이션전문 레시피사이트입니다.
          </p>
          <h4 className="mt-10 font-semibold text-mono100">
            <span className="text-2xl font-semibold">타쿠&apos;</span>
            <span className="text-xl">s history</span>
          </h4>
          <p className="mt-4">애니메이션을 좋아하는 오타쿠...</p>
        </div>
      </div>
    </div>
  );
};

export default App;
