import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { query, collection, orderBy, limit, getDocs } from "firebase/firestore";
import { dbService } from "@/config/firebase";
import Link from "next/link";

const BestRecipe: NextPage = () => {
    const [currentItems, setCurrentItems] = useState<RecipeProps[]>([]);

    const getList = async () => {
        const items = query(
            collection(dbService, "recipe"),
            orderBy("viewCount", "desc"),
            limit(3)
        );
        const querySnapshot = await getDocs(items);
        const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        setCurrentItems(newData);
    };

    useEffect(() => {
        getList();
    }, []);

    return (
        <>
            <div className="space-y-4 flex flex-col items-center mb-14">
                <p className="text-3xl font-extrabold">인기레시피</p>
                <p className="text-lg font-medium text-slate-500">
                    타쿠의 식탁에서 HOT한 요즘유행요리
                </p>
            </div>
            <div className="grid grid-cols-3 gap-6">
                {currentItems?.map((item) => {
                    return (
                        <div key={item.id} className="w-[316px]">
                            <div className="w-full h-[188px] overflow-hidden mx-auto">
                                <picture>
                                    <img
                                        src={`${item.thumbnail}`}
                                        className="w-full h-full object-cover"
                                        alt="recipe picture"
                                        width={800}
                                        height={500}
                                    />
                                </picture>
                            </div>
                            <ul className="text-sm text-slate-500 space-x-2 flex">
                                <li>&#35;{item.animationTitle}</li>
                                <li>&#35;{item.cookingTime}</li>
                            </ul>
                            <div className="text-sm text-red-400">
                                {item.displayStatus === "회원 공개" &&
                                    `#${item.displayStatus}`}
                            </div>
                            <p className="text-lg text-slate-900 font-semibold">
                                <Link href={`/detailRecipePage/${item.id}`}>
                                    {item.foodTitle}
                                </Link>
                            </p>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default BestRecipe;
