import { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
// import ReactPlayer from "react-player/youtube";

const Video = () => {
    const [hasWindow, setHasWindow] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
    }, [hasWindow]);

    return (
        <>
            {hasWindow && (
                <ReactPlayer
                    className="react-player"
                    url={
                        "https://firebasestorage.googleapis.com/v0/b/reactnative-dbdad.appspot.com/o/food.mp4?alt=media&token=fb80cdb8-7c9e-4fe9-8560-98dde3fc6b86"
                    } // 플레이어 url
                    width="100%"
                    height="650px"
                    playing={true} // 자동 재생 on
                    muted={true} // 음소거 on
                    controls={false} // 플레이어 컨트롤 노출 여부
                    light={false} // 플레이어 모드
                    pip={false} // pip 모드 설정 여부
                    loop={true} // 반복재생
                />
            )}
        </>
    );
};

export default Video;
