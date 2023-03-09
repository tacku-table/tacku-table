import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const Video = () => {
    const [hasWindow, setHasWindow] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
    }, [hasWindow]);

    return (
        <div className="relative pt-[56.25%] xl:pt-[31.65%] w-full xl:w-4/6">
            {hasWindow && (
                <ReactPlayer
                    className="absolute top-0 left-0"
                    url={"https://www.youtube.com/watch?v=edThizMssp8"} // 영상 url
                    config={{
                        youtube: {
                            embedOptions: {
                                host: "https://www.youtube-nocookie.com",
                            },
                        },
                    }}
                    width="100%"
                    height="100%"
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
