import { useEffect, useState } from "react";
import { SiKakaotalk } from "react-icons/si";
import { kakaoInit } from "@/util";

interface kakaosharedType {
  targetWholeData: targetWholeDataType;
}

function Kakaoshared(props: kakaosharedType) {
  const kakaoShare = () => {
    const { Kakao, location } = window;
    Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: props.targetWholeData.foodTitle,
        description: props.targetWholeData.animationTitle,
        imageUrl: props.targetWholeData.thumbnail,
        link: {
          mobileWebUrl: location.href,
          webUrl: location.href,
        },
      },
      buttons: [
        {
          title: "타쿠의 레시피 방문하기",
          link: {
            mobileWebUrl: location.href,
            webUrl: location.href,
          },
        },
      ],
    });
  };

  useEffect(() => {
    kakaoInit();
  }, []);
  return (
    <button onClick={kakaoShare} className="w-6 h-6 mr-2">
      <SiKakaotalk style={{ fontSize: "36px", color: "#AFAFAF" }} />
    </button>
  );
}

export default Kakaoshared;
