import { cls } from "@/util";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { setTimeout } from "timers";

const Slider: NextPage = () => {
    const [index, setIndex] = useState(0);
    const cards = [
        { id: "1", text: "#하울의 움직이는 성" },
        { id: "2", text: "#센과 치히로의 행방불명" },
        { id: "3", text: "#마루 밑의 아리에티" },
    ];
    // @ts-ignore
    const mod = (n, m) => {
        const result = n % m; //반환하는값이 양수인지 확인
        return result >= 0 ? result : result + m;
    };

    useEffect(() => {
        setTimeout(() => {
            setIndex((index + 1) % cards.length);
        }, 4000);
    }, [index]);

    return (
        <div className="w-full h-14 relative overflow-hidden">
            {cards.map((item, i) => {
                const indexLeft = mod(index - 1, cards.length);
                const indexRight = mod(index + 1, cards.length);

                let classN = "";
                if (i === index) {
                    classN = "card";
                } else if (i === indexRight) {
                    classN = "card transform translate-y-14 transition-all";
                } else if (i === indexLeft) {
                    classN = "card transform -translate-y-14 transition-all";
                }
                return (
                    <div key={item.id} className={classN}>
                        {item.text}
                    </div>
                );
            })}
        </div>
    );
};

export default Slider;
