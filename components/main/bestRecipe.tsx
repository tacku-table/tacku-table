import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { query, collection, orderBy, limit, getDocs } from "firebase/firestore";
import { dbService } from "@/config/firebase";
import RecipeData from "../search/RecipeData";
import { useRouter } from "next/router";

const BestRecipe: NextPage = () => {
    const [dataResults, setDataResults] = useState<RecipeProps[]>([]);
    const router = useRouter();
    const sortedBest = () => {
        router.push("/searchPage");
        sessionStorage.setItem("userWatching", "viewCount");
    };

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
        setDataResults(newData);
    };

    useEffect(() => {
        getList();
    }, []);

    return (
        <>
            <div className="space-y-4 flex flex-col items-center mb-7">
                <p className="text-3xl font-extrabold">인기레시피</p>
                <p className="text-lg font-medium text-slate-500">
                    타쿠의 식탁에서 HOT한 요즘유행요리
                </p>
            </div>
            <div className="flex flex-col items-end">
                <button
                    onClick={sortedBest}
                    className="text-main border border-main w-[86px] h-[35px] mb-4 rounded-sm hover:bg-main hover:text-white transition-all duration-200"
                >
                    더보기
                </button>
                <RecipeData dataResults={dataResults} />
            </div>
        </>
    );
};

export default BestRecipe;
