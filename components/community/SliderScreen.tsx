import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { setTimeout } from "timers";
import aniImg01 from "../../public/images/lemi.jpg";
import aniImg02 from "../../public/images/lemi2.jpg";
import aniImg03 from "../../public/images/lemi3.jpg";
import Image from "next/image";

const SliderScreen: NextPage = () => {
    const [index, setIndex] = useState(0);
    const cards = [
        {
            id: "1",
            image: aniImg01,
        },
        { id: "2", image: aniImg02 },
        { id: "3", image: aniImg03 },
    ];
    // @ts-ignore
    const mod = (n, m) => {
        const result = n % m; //반환하는값이 양수인지 확인
        return result >= 0 ? result : result + m;
    };

    useEffect(() => {
        setTimeout(() => {
            setIndex((index + 1) % cards.length);
        }, 5000);
    }, [index]);

    return (
        <div className="w-[860px] h-[412px] relative overflow-hidden mt-4 rounded-lg">
            {cards.map((item, i) => {
                const indexLeft = mod(index - 1, cards.length);
                const indexRight = mod(index + 1, cards.length);

                let classN = "";
                switch (i) {
                    case index:
                        classN = "ani-card";
                        break;
                    case indexLeft:
                        classN =
                            "ani-card transform translate-x-[860px] opacity-20";
                        break;
                    case indexRight:
                        classN =
                            "ani-card transform -translate-x-[860px] opacity-20";
                }
                return (
                    <Image
                        key={item.id}
                        className={classN}
                        width={800}
                        height={500}
                        src={item.image}
                        alt="ani_image"
                    />
                );
            })}
        </div>
    );
};

export default SliderScreen;
