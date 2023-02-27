import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// 전체레시피불러오기
const RecipeData = ({ dataResults, filteredFood, filteredTime }: any) => {
    // 회원아니면 alert뜨게함. 추가 로직
    const [storageCurrentUser, setStorageCurrentUser] = useState("");

    // 상세페이지이동
    const router = useRouter();
    const goToDetail = (item: any) => {
        item.displayStatus === "회원 공개" && storageCurrentUser === "guest"
            ? alert("멤버공개 레시피글입니다. 로그인을 진행해주세요.")
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
        <div className="grid grid-cols-3 gap-x-5 gap-y-14">
            {dataResults?.length &&
            filteredFood?.length &&
            filteredTime?.length ? (
                dataResults
                    .filter(
                        (item: any) =>
                            filteredFood.includes(item.foodCategory) ||
                            filteredTime.includes(item.cookingTime)
                    )
                    .map((item: any) => {
                        return (
                            <div
                                key={item.id}
                                className="aspect-[1/0.7] cursor-pointer"
                                onClick={() => {
                                    goToDetail(item);
                                }}
                            >
                                <div className="h-[188px] overflow-hidden mx-auto relative">
                                    <picture>
                                        <img
                                            src={`${item.thumbnail}`}
                                            className="aspect-[1/0.7] object-cover rounded-sm"
                                            alt="recipe picture"
                                            width={316}
                                            height={188}
                                        />
                                    </picture>
                                    {item.displayStatus === "회원 공개" && (
                                        <>
                                            <div className="w-full h-full bg-slate-50 opacity-60 absolute top-0 left-0"></div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-6 h-6 absolute bottom-4 right-4 text-gray-500"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
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
                    })
            ) : dataResults?.length && filteredFood?.length ? (
                dataResults
                    .filter((item: any) =>
                        filteredFood.includes(item.foodCategory)
                    )
                    .map((item: any) => {
                        return (
                            <div
                                key={item.id}
                                className="aspect-[1/0.7] cursor-pointer"
                                onClick={() => {
                                    goToDetail(item);
                                }}
                            >
                                <div className="h-[188px] overflow-hidden mx-auto relative">
                                    <picture>
                                        <img
                                            src={`${item.thumbnail}`}
                                            className="aspect-[1/0.7] object-cover rounded-sm"
                                            alt="recipe picture"
                                            width={316}
                                            height={188}
                                        />
                                    </picture>
                                    {item.displayStatus === "회원 공개" && (
                                        <>
                                            <div className="w-full h-full bg-slate-50 opacity-60 absolute top-0 left-0"></div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-6 h-6 absolute bottom-4 right-4 text-gray-500"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
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
                    })
            ) : dataResults?.length && filteredTime?.length ? (
                dataResults
                    .filter((item: any) =>
                        filteredTime.includes(item.cookingTime)
                    )
                    .map((item: any) => {
                        return (
                            <div
                                key={item.id}
                                className="aspect-[1/0.7] cursor-pointer"
                                onClick={() => {
                                    goToDetail(item);
                                }}
                            >
                                <div className="h-[188px] overflow-hidden mx-auto relative">
                                    <picture>
                                        <img
                                            src={`${item.thumbnail}`}
                                            className="aspect-[1/0.7] object-cover rounded-sm"
                                            alt="recipe picture"
                                            width={316}
                                            height={188}
                                        />
                                    </picture>
                                    {item.displayStatus === "회원 공개" && (
                                        <>
                                            <div className="w-full h-full bg-slate-50 opacity-60 absolute top-0 left-0"></div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-6 h-6 absolute bottom-4 right-4 text-gray-500"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
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
                    })
            ) : dataResults.length ? (
                dataResults.map((item: any) => {
                    return (
                        <div
                            key={item.id}
                            className="aspect-[1/0.7] cursor-pointer"
                            onClick={() => {
                                goToDetail(item);
                            }}
                        >
                            <div className="w-full h-[188px] overflow-hidden mx-auto relative">
                                <picture>
                                    <img
                                        src={`${item.thumbnail}`}
                                        className="aspect-[1/0.7] object-cover rounded-sm"
                                        alt="recipe picture"
                                        width={316}
                                        height={188}
                                    />
                                </picture>
                                {item.displayStatus === "회원 공개" && (
                                    <>
                                        <div className="w-full h-full aspect-[1/0.7] bg-slate-50 opacity-60 absolute top-0 left-0"></div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6 absolute bottom-4 right-4 text-gray-500"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
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
                })
            ) : (
                <div>게시물이 존재하지 않습니다.</div>
            )}
        </div>
    );
};

export default RecipeData;
