import { useEffect, useState } from "react";
import { SiKakaotalk } from "react-icons/si";
import { kakaoInit } from "@/util";

function Kakaoshared() {
  const kakaoShare = () => {
    const { Kakao, location } = window;
    Kakao.Share?.sendScrap({
      requestUrl: location.href,
    });
    console.log(typeof Kakao);
  };

  useEffect(() => {
    kakaoInit();
  }, []);
  return (
    <button onClick={kakaoShare} className="w-6 h-6 mr-2">
      <SiKakaotalk style={{ fontSize: "40px", color: "#F16C34" }} />
    </button>
  );
}

export default Kakaoshared;
