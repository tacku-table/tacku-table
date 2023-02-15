import React, { useEffect, useState } from "react";

const Video: React.FC = () => {
    const [hasWindow, setHasWindow] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
    }, [hasWindow]);

    return (
        <>
            {hasWindow && (
                <video
                    autoPlay={true}
                    muted={true}
                    loop={true}
                    style={{ width: "100%", height: "650px" }}
                    src={require("../../public/assets/food.mp4")}
                />
            )}
        </>
    );
};

export default Video;
