import { useEffect, useState } from "react";
import kakaoShared from "../../public/images/kakaoShare.png";
import { kakaoInit } from "@/util";
import Image from "next/image";

function Kakaoshared() {
  const kakaoShare = () => {
    const { Kakao, location } = window;
    Kakao.Share?.sendScrap({
      requestUrl: location.href,
    });
  };
  useEffect(() => {
    kakaoInit();
  }, []);

  return (
    <button onClick={kakaoShare}>
      <Image
        src={kakaoShared}
        width={36}
        height={36}
        alt="default_img"
        className="rounded-md object-cover aspect-[4/3]"
        unoptimized
      />
    </button>
  );
}

export default Kakaoshared;
