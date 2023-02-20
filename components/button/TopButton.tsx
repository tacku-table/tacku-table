import React from "react";

const TopButton = () => {
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <button type="button" onClick={scrollToTop}>
        탑으로
      </button>
    </>
  );
};

export default TopButton;
