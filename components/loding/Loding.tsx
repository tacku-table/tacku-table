import React from "react";
import Lottie from "react-lottie-player";
import lottieJson from "@/animation/loding.json";

const Loding = () => {
  return (
    <div className="w-full h-full fixed top-0 left-0 z-[150] bg-white">
      <div className="sm:w-1/3 w-2/3 h-1/3 absolute sm:top-[28%] top-[20%] sm:left-[35%] left-[17%]">
        <Lottie
          loop
          animationData={lottieJson}
          play
          speed={1.5}
          className="w-full bg-transparenth-[200px] transform -translate-x-[5%]"
        />
        <p className="text-center text-brand100 font-bold text-3xl animate-bounce-fast">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loding;
