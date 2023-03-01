import { dbService } from "@/config/firebase";
import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
} from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Test = () => {
    const [currentItems, setCurrentItems] = useState<RecipeProps[]>([]);
    const [lastDoc, setLastdoc] = useState(0);

    const first = async () => {
        const querySnapshot = await getDocs(
            query(
                collection(dbService, "recipe"),
                orderBy("createdAt", "desc"),
                limit(6)
            )
        );
        const newData = querySnapshot.docs.map((doc: any) => ({
            ...doc.data(),
            id: doc.id,
        }));
        setCurrentItems((prev) => [...prev, ...newData]);
        const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
        setCurrentItems((prev) => [...prev, ...newData]);
        setLastdoc(lastDoc);
    };

    const next = async () => {
        const querySnapshot = await getDocs(
            query(
                collection(dbService, "recipe"),
                orderBy("createdAt", "desc"),
                startAfter(lastDoc),
                limit(6)
            )
        );
        updateState(querySnapshot);
    };
    const updateState = (querySnapshot: any) => {
        const newData = querySnapshot.docs.map((doc: any) => ({
            ...doc.data(),
            id: doc.id,
        }));
        const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
        setCurrentItems((prev) => [...prev, ...newData]);
        setLastdoc(lastDoc);
    };

    useEffect(() => {
        first();
    }, []);

    return (
        <div>
            {currentItems.length === 0 && <div>loading...</div>}
            {currentItems.map((item) => {
                return (
                    <div
                        key={item.id}
                        className="w-[316px] aspect-[1/0.7] cursor-pointer"
                    >
                        <div className="w-[316px] h-[188px] overflow-hidden mx-auto relative">
                            <Image
                                src={`${item.thumbnail}`}
                                className="aspect-[1/0.7] object-cover rounded-sm"
                                alt="recipe_picture"
                                width={316}
                                height={188}
                                loader={({ src }) => src}
                                unoptimized
                                priority={true}
                            />
                            {item.displayStatus === "회원 공개" && (
                                <>
                                    <div className="w-full h-full bg-black opacity-40 absolute top-0 left-0"></div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5 absolute bottom-4 right-4 text-white"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                        />
                                    </svg>
                                </>
                            )}
                        </div>
                        <ul className="text-sm text-slate-500 space-x-4 mt-1 flex">
                            <li className="text-ellipsis overflow-hidden whitespace-nowrap text-blue100">
                                &#35;{item.animationTitle}
                            </li>
                            <li className="whitespace-nowrap">
                                &#35;{item.cookingTime}
                            </li>
                        </ul>
                        <p className="text-lg text-slate-900 font-semibold mt-1">
                            {item.foodTitle}
                        </p>
                    </div>
                );
            })}
            <button type="button" onClick={next}>
                더보기
            </button>
        </div>
    );
};

export default Test;
