import React from "react";
import Lottie from "react-lottie-player";
import lottieJson from "@/animation/loding2.json";

const Loding = () => {
  return (
    <div className="w-full h-full fixed top-0 left-0 z-50 bg-white/[0.7] backdrop-blur-md">
      <div className="w-1/3 h-1/3 absolute top-[30%] left-[35%]">
        <Lottie
          loop
          animationData={lottieJson}
          play
          speed={2}
          className="w-full bg-transparenth-[200px] transform -translate-x-[7%]"
        />
        <p className="text-center text-brand100 font-bold text-4xl">Loding</p>
      </div>
    </div>
  );
};

export default Loding;
