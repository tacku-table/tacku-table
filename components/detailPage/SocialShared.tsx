import { useEffect } from "react";
import { SiFacebook, SiKakaotalk, SiTwitter } from "react-icons/si";
import { kakaoInit } from "@/util";

interface socialSharedType {
  targetWholeData: targetWholeDataType;
}
function SocialShared(props: socialSharedType) {
  const shareToTwitter = () => {
    const sharedLink = encodeURIComponent(window.location.href);
    let title = props.targetWholeData.foodTitle;
    window.open(
      `https://twitter.com/intent/tweet?url=${sharedLink}&text=${title}`,
      "popup제목"
    );
  };

  const shareToFacebook = () => {
    let title = props.targetWholeData.foodTitle;
    const sharedLink = encodeURIComponent(window.location.href);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${sharedLink}&t=${title}&src=sdkpreparse`,
      "popup제목"
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
    <div className="flex items-center justify-center">
      <button
        onClick={kakaoShare}
        className="recipepage-share-button text-[#f39e31]"
      >
        <SiKakaotalk />
      </button>
      <button
        onClick={shareToFacebook}
        className="text-[#f39e31] recipepage-share-button"
      >
        <SiFacebook />
      </button>
      <button
        onClick={shareToTwitter}
        className="text-[#f39e31] recipepage-share-button"
      >
        <SiTwitter />
      </button>
    </div>
  );
}

export default SocialShared;
