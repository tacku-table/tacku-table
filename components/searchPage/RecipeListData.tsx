import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const RecipeListData = ({ item }: { item: TypeRecipe }) => {
    // 회원아니면 alert뜨게함. 추가 로직
    const [storageCurrentUser, setStorageCurrentUser] = useState("");
    // 상세페이지이동
    const router = useRouter();
    const goToDetail = (item: TypeRecipe) => {
        item.displayStatus === "회원 공개" && storageCurrentUser === "guest"
            ? toast.warning("멤버공개 레시피글입니다. 로그인을 진행해주세요.", {
                  autoClose: 2000,
              })
            : router.push(`/detailRecipePage/${item.id}`);
    };

    useEffect(() => {
        const user = sessionStorage.getItem("User") || "";
        if (user) {
            const parseUser = JSON.parse(user);
            return setStorageCurrentUser(parseUser.uid);
        }
        setStorageCurrentUser("guest");
    }, [storageCurrentUser]);

    return (
        <div
            key={item.id}
            className="w-[316px] aspect-[1/0.7] cursor-pointer"
            onClick={() => {
                goToDetail(item);
            }}
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
                        <p className="absolute bottom-4 right-10 text-white text-sm">
                            회원전용
                        </p>
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
                <li className="whitespace-nowrap">&#35;{item.cookingTime}</li>
            </ul>
            <p className="text-lg text-slate-900 font-semibold mt-1">
                {item.foodTitle}
            </p>
        </div>
    );
};

export default RecipeListData;
