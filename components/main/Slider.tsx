import { cls } from "@/util";
import type { NextPage } from "next";
import { useState } from "react";

const Slider: NextPage = () => {
    const [show, setShow] = useState(false);
    setInterval(() => setShow(!show), 3000);

    return (
        <div className="overflow-hidden">
            <div
                className={cls(
                    "bg-purple-500 w-full h-30 overflow-hidden ",
                    show ? "transform -translate-y-10" : ""
                )}
            >
                <div className="w-full h-10 bg-red-800">1</div>
                <div className="w-full h-10 bg-blue-800">2</div>
                <div className="w-full h-10 bg-green-800">3</div>
            </div>
            <button>move</button>
        </div>
    );
};

export default Slider;
