import { useEffect, useState } from "react";
import { SiFacebook, SiKakaotalk, SiTwitter } from "react-icons/si";
import { kakaoInit } from "@/util";

interface kakaosharedType {
  targetWholeData: targetWholeDataType;
}

function Kakaoshared(props: kakaosharedType) {
  // const shareToFacebook = () => {
  //   const sharedLink = encodeURIComponent(window.location.href);
  //   window.open(
  //     `https://www.facebook.com/sharer/sharer.php?u=${sharedLink}%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse`
  //   );
  // };
  // const shareTwitter = () => {
  //   const sharedLink = encodeURIComponent(window.location.href);
  //   const sendText = props.targetWholeData.foodTitle;
  //   window.open(
  //     `https://twitter.com/intent/tweet?text= ${sendText}&url=${sharedLink}`
  //   );
  // };
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
    <>
      <button onClick={kakaoShare} className="w-6 h-6 mr-2">
        <SiKakaotalk style={{ fontSize: "36px", color: "#AFAFAF" }} />
      </button>
      {/* <button onClick={shareToFacebook} className="w-6 h-6 mr-2">
        <SiFacebook style={{ fontSize: "36px", color: "#AFAFAF" }} />
      </button>
      <button onClick={shareTwitter} className="w-6 h-6 mr-2">
        <SiTwitter style={{ fontSize: "36px", color: "#AFAFAF" }} />
      </button> */}
    </>
  );
}

export default Kakaoshared;
