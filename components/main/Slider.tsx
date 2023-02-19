import { cls } from "@/util";
import type { NextPage } from "next";
import { useState } from "react";

const Slider: NextPage = () => {
    const [show, setShow] = useState(false);

    return (
        <div className="overflow-hidden">
            <div
                className={cls(
                    "w-full h-10 overflow-hidden ",
                    show ? "transform -translate-y-10" : ""
                )}
            >
                <div className="w-full h-10 bg-red-500">111111</div>
                <div className="w-full h-10 bg-blue-500">222222</div>
                <div className="w-full h-10 bg-green-500">333333</div>
            </div>
        </div>
    );
};

export default Slider;
