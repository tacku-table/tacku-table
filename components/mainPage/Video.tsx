import { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";

const Video = () => {
    const [hasWindow, setHasWindow] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
    }, [hasWindow]);

    return (
        <div className="w-full flex justify-center">
            {hasWindow && (
                <ReactPlayer
                    className="react-player"
                    url={"https://www.youtube.com/watch?v=edThizMssp8"} // 영상 url
                    config={{
                        youtube: {
                            embedOptions: {
                                host: "https://www.youtube-nocookie.com",
                            },
                        },
                    }}
                    width="110vh"
                    height="62vh"
                    playing={true} // 자동 재생 on
                    muted={true} // 음소거 on
                    controls={false} // 플레이어 컨트롤 노출 여부
                    light={false} // 플레이어 모드
                    pip={false} // pip 모드 설정 여부
                    loop={true} // 반복재생
                />
            )}
        </div>
    );
};

export default Video;
