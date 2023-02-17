import type { NextPage } from "next";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { dbService } from "@/config/firebase";
import { useEffect, useState } from "react";

// 전체레시피불러오기
const TotalRecipe: NextPage = () => {
    const [currentItems, setCurrentItems] = useState<RecipeProps[]>([]);

    const getList = async () => {
        const items = query(
            collection(dbService, "recipe"),
            orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(items);
        const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        setCurrentItems(newData);
        console.log(newData);
    };

    useEffect(() => {
        getList();
    }, []);

    return (
        <>
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
        </>
    );
};

export default TotalRecipe;
