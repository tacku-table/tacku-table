import { cls } from "@/util";
import type { NextPage } from "next";
import { useState } from "react";

const Slider: NextPage = () => {
    const [show, setShow] = useState(false);
    // setInterval(() => setShow(!show), 3000);
    // const observer = new IntersectionObserver((e) => {
    //     e.forEach((item) => {

    //     });
    // });
    // const div = document.querySelectorAll("div");
    // observer.observe(div[0]);

    return (
        <div className="overflow-hidden">
            <div
                className={cls(
                    "bg-purple-500 w-full h-30 overflow-hidden ",
                    show ? "transform -translate-y-10" : ""
                )}
            >
                <div className="w-full h-10 bg-red-800 opacity-0 transition-all">
                    1
                </div>
                <div className="w-full h-10 bg-blue-800 slider">2</div>
                <div className="w-full h-10 bg-green-800">3</div>
            </div>
            <button>move</button>
        </div>
    );
};

export default Slider;
