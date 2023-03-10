import { dbService } from "@/config/firebase";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { clearStorage } from "../layout/Header";
import RecipeList from "../searchPage/RecipeList";

const NewRecipe: NextPage = () => {
    const [dataResults, setDataResults] = useState<TypeRecipe[]>([]);
    const router = useRouter();
    const sortedBest = () => {
        router.push("/search");
        clearStorage();
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
            <div className="space-y-4 flex flex-col items-center my-7">
                <p className="text-3xl font-semibold">최신레시피</p>
                <p className="text-lg font-medium text-slate-500">
                    갓 나온 요리처럼 따끈따끈한 레시피
                </p>
            </div>
            <div className="flex flex-col items-end">
                <button onClick={sortedBest} className="show-more">
                    더보기
                </button>
                <div className="grid mx-auto md:grid-cols-2 lg:mx-0 lg:grid-cols-3 gap-x-7 gap-y-9 relative pb-24">
                    <RecipeList dataResults={dataResults} />
                </div>
            </div>
        </>
    );
};

export default NewRecipe;
