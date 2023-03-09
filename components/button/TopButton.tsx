import React from "react";

const TopButton = ({ className }: any) => {
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <button
        type="button"
        onClick={scrollToTop}
        className="bg-[#f39e31] aspect-square p-3 rounded-full text-white fixed bottom-5 right-1 md:right-5 lg:right-10 2xl:right-24 z-50 text-sm"
      >
        Top
      </button>
    </>
  );
};

export default TopButton;
