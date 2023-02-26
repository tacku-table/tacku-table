import { dbService } from "@/config/firebase";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import RecipeData from "../search/RecipeData";

const NewRecipe: NextPage = () => {
    const [dataResults, setDataResults] = useState<RecipeProps[]>([]);
    const router = useRouter();
    const sortedBest = () => {
        router.push("/searchPage");
        sessionStorage.setItem("userWatching", "createdAt");
    };

    const getList = async () => {
        const items = query(
            collection(dbService, "recipe"),
            orderBy("createdAt", "desc"),
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
            <div className="space-y-4 flex flex-col items-center mt-36 mb-7">
                <p className="text-3xl font-extrabold">최신레시피</p>
                <p className="text-lg font-medium text-slate-500">
                    타쿠의 식탁에서 HOT한 실패없는 요즘유행요리
                </p>
            </div>
            <div className="flex flex-col items-end">
                <button
                    onClick={sortedBest}
                    className="text-brand100 border border-brand100 w-[86px] h-[35px] mb-4 rounded-sm hover:bg-brand100 hover:text-white transition-all duration-200"
                >
                    더보기
                </button>
                <RecipeData dataResults={dataResults} />
            </div>
        </>
    );
};

export default NewRecipe;
