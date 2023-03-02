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
                className="bg-brand100 p-2 rounded-full text-white fixed bottom-5 right-24"
            >
                Top
            </button>
        </>
    );
};

export default TopButton;
