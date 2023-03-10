import React from "react";
import Lottie from "react-lottie-player";
import lottieJson from "@/animation/loding.json";

const Loding = () => {
  return (
    <div className="w-full h-full fixed top-0 left-0 z-[150] bg-white">
      <div className="xl:w-1/3 w-1/2 h-1/4 absolute md:top-[25%] top-[40%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]">
        <Lottie
          loop
          animationData={lottieJson}
          play
          speed={1.4}
          className="w-[80%] bg-transparenth-[200px] transform -translate-x-3 mx-auto"
        />
        <p className="text-center text-[#f16c34] font-bold lg:text-[40px] text-3xl animate-bounce-fast">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loding;
