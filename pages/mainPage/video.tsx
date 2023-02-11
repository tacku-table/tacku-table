// import YouTube, { YouTubeProps } from "react-youtube";

// function Example() {
//     const onPlayerReady: YouTubeProps["onReady"] = (event) => {
//         event.target.pauseVideo();
//     };

//     const opts: YouTubeProps["opts"] = {
//         height: "650px",
//         width: "100%",
//         playerVars: {
//             controls: 0,
//             mute: 1,
//             autoplay: 1,
//             rel: 0,
//             modestbranding: 1,
//             loop: 1,
//             playsinline: 1,
//             start: 34,
//             end: 40,
//             disablekb: 1,
//         },
//     };

//     return (
//         <YouTube videoId="IgN7cyPu4q4" opts={opts} onReady={onPlayerReady} />
//     );
// }

// export default Example;

// import ReactPlayer from "react-player/lazy";
import ReactPlayer from "react-player/youtube";

const Video = () => {
    return (
        <>
            <ReactPlayer
                className="react-player"
                url={"https://www.youtube.com/watch?v=IgN7cyPu4q4"} // 플레이어 url
                width="100%"
                height="650px"
                playing={true} // 자동 재생 on
                muted={true} // 음소거 on
                controls={false} // 플레이어 컨트롤 노출 여부
                light={false} // 플레이어 모드
                pip={false} // pip 모드 설정 여부
                loop={true} // 반복재생
            />
        </>
    );
};

export default Video;
