import SearchRecipeBar from "@/components/search/SearchRecipeBar";
import { dbService } from "@/config/firebase";
import { cls } from "@/util";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Fuse from "fuse.js";

// 카테고리별 불러오기
const ClassifiedRecipe: NextPage = () => {
    const [isBest, setIsBest] = useState(false);
    const changeBestBtn = () => {
        setIsBest(!isBest);
    };
    const [currentItems, setCurrentItems] = useState<RecipeProps[]>([]);

    const router = useRouter();

    const getList = async () => {
        const items = query(
            collection(dbService, "recipe"),
            orderBy("createdAt", "desc"),
            where(
                `${
                    router.query.cate === "15분이하" ||
                    router.query.cate === "30분이하" ||
                    router.query.cate === "1시간이하" ||
                    router.query.cate === "1시간이상"
                        ? "cookingTime"
                        : "foodCategory"
                }`,
                "==",
                `${router.query.cate}`
            )
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
    }, [router.query.cate]);

    return (
        <div className="w-full mt-20 flex flex-col justify-center items-center">
            <SearchRecipeBar />
            <ul className="w-3/4 flex justify-end mb-[20px]">
                <li
                    className={cls(
                        "w-[87px] h-[35px] border border-border border-collapse hover:bg-main hover:text-white flex justify-center items-center cursor-pointer",
                        isBest ? "bg-main text-white" : "text-grayText"
                    )}
                >
                    추천순
                </li>
                <li
                    className={cls(
                        "w-[87px] h-[35px] border border-border border-collapse hover:bg-main hover:text-white flex justify-center items-center cursor-pointer",
                        !isBest ? "bg-main text-white" : "text-grayText"
                    )}
                >
                    최신순
                </li>
            </ul>
            <div className="w-3/4 border-b border-border mb-[30px]"></div>
            <div className="w-3/4 flex justify-between mb-20">
                <div className="bg-slate-100 px-2 py-3 w-[150px] h-[50px] mr-7 text-center">
                    {router.query.cate?.toString().replaceAll("&", "/")}
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {currentItems.length ? (
                        currentItems.map((item) => {
                            return (
                                <div key={item.id}>
                                    <div className="bg-slate-100 w-[316px] h-[188px] overflow-hidden mx-auto">
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
                                        {item.foodTitle}
                                    </p>
                                </div>
                            );
                        })
                    ) : (
                        <div>게시물이 존재하지 않습니다</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClassifiedRecipe;
