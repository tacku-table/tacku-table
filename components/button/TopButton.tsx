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
                className="bg-brand100 p-2 rounded-full text-white fixed bottom-5 right-28"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                    />
                </svg>
            </button>
        </>
    );
};

export default TopButton;
