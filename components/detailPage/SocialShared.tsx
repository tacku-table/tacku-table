import { useEffect, useState } from "react";
import { SiFacebook, SiKakaotalk, SiTwitter } from "react-icons/si";
import { kakaoInit } from "@/util";

interface socialSharedType {
  targetWholeData: targetWholeDataType;
}
function SocialShared(props: socialSharedType) {
  const shareToTwitter = () => {
    const sharedLink =
      "text=" +
      encodeURIComponent(props.targetWholeData.foodTitle + " \n ") +
      encodeURIComponent(location.href);
    window.open(`https://twitter.com/intent/tweet?${sharedLink}`);
  };

  const shareToFacebook = () => {
    const sharedLink = encodeURIComponent(window.location.href);
    window.open(
      // `https://www.facebook.com/sharer/sharer.php?u=${sharedLink};src=sdkpreparse`
      `https://www.facebook.com/sharer/sharer.php?u=${sharedLink}%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse`,
      "width=486, height=286"
    );
  };
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
      <button onClick={shareToFacebook} className="w-6 h-6 mr-2">
        <SiFacebook style={{ fontSize: "36px", color: "#AFAFAF" }} />
      </button>
      <button onClick={shareToTwitter} className="w-6 h-6 mr-2">
        <SiTwitter style={{ fontSize: "36px", color: "#AFAFAF" }} />
      </button>
    </>
  );
}

export default SocialShared;
