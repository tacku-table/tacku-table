import React, { useRef } from "react";
import styled from "@emotion/styled";
import useIntersectionObsever from "./observer";

const ContentDiv = styled.div`
    height: 200px;
    font-size: 36px;
    margin: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    &.animation {
        animation-name: opacity;
        animation-duration: 5000ms;

        @keyframes opacity {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    }
`;

const App = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isInViewport = useIntersectionObsever(ref);

    return (
        <>
            <div style={{ height: "2000px" }} />
            <ContentDiv ref={ref} className={isInViewport ? "animation" : ""}>
                글자 등장!
            </ContentDiv>
        </>
    );
};

export default App;
