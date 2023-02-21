import { dbService } from "@/config/firebase";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import RecipeData from "../search/RecipeData";

const NewRecipe: NextPage = () => {
    const [dataResults, setDataResults] = useState<RecipeProps[]>([]);

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
            <div className="space-y-4 flex flex-col items-center mt-32 mb-14">
                <p className="text-3xl font-extrabold">최신레시피</p>
                <p className="text-lg font-medium text-slate-500">
                    타쿠의 식탁에서 HOT한 실패없는 요즘유행요리
                </p>
            </div>
            <RecipeData dataResults={dataResults} />
        </>
    );
};

export default NewRecipe;
