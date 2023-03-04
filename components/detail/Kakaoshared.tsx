import { useEffect, useState } from "react";
import { SiKakaotalk } from "react-icons/si";
import { kakaoInit } from "@/util";

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
      <SiKakaotalk />
    </button>
  );
}

export default Kakaoshared;
