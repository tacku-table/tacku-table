import { useRouter } from "next/router";

// 전체레시피불러오기
const RecipeData = ({ dataResults }: any) => {
    // 상세페이지이동
    const router = useRouter();
    const goToDetail = (id: any) => {
        router.push(`/detailRecipePage/${id}`);
    };

    return (
        <div className="grid grid-cols-3 gap-5 gap-y-14">
            {dataResults.length ? (
                dataResults.map((item: any) => {
                    return (
                        <div
                            key={item.id}
                            className="w-[316px] cursor-pointer"
                            onClick={() => goToDetail(item.id)}
                        >
                            <div className="w-full h-[188px] overflow-hidden mx-auto relative">
                                {item.displayStatus === "회원 공개" && (
                                    <div className="w-full h-full bg-slate-50 opacity-60 absolute top-0 left-0"></div>
                                )}
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
                <div>게시물이 존재하지 않습니다.</div>
            )}
        </div>
    );
};

export default RecipeData;
