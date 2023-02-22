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
      <button type="button" onClick={scrollToTop} className={className}>
        탑으로
      </button>
    </>
  );
};

export default TopButton;
