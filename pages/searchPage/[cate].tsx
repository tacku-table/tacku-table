import SearchRecipeBar from "@/components/search/SearchRecipeBar";
import { dbService } from "@/config/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// 카테고리별 불러오기
const ClassifiedRecipe: NextPage = () => {
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
        console.log(newData);
        console.log(router.query.cate);
    };

    useEffect(() => {
        getList();
    }, [router.query.cate]);

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <SearchRecipeBar />
            <ul className="w-3/4 flex justify-end mb-[20px]">
                <li className="w-[87px] h-[35px] border border-border border-collapse hover:bg-main text-baseText hover:text-white flex justify-center items-center cursor-pointer">
                    추천순
                </li>
                <li className="w-[87px] h-[35px] border border-border border-collapse hover:bg-main text-baseText hover:text-white flex justify-center items-center cursor-pointer">
                    최신순
                </li>
            </ul>
            <div className="w-3/4 border-b border-border mb-[30px]"></div>
            <div className="w-3/4 flex justify-between">
                <div className="bg-slate-100 w-[150px] h-full">카테고리</div>
                <div className="grid grid-cols-3 gap-4">
                    {currentItems?.map((item) => {
                        return (
                            <div key={item.id}>
                                <div className="bg-slate-100 w-[300px] h-[226px] overflow-hidden mx-auto">
                                    <img
                                        src={`${item.thumbnail}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <ul className="text-sm text-slate-500 space-x-2 flex">
                                    <li>{item.foodCategory}</li>
                                    <li>{item.ingredient}</li>
                                </ul>
                                <p className="text-lg text-slate-900 font-semibold">
                                    {item.foodTitle}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ClassifiedRecipe;
