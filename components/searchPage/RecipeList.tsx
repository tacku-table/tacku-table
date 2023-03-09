import Image from "next/image";
import RecipeListData from "./RecipeListData";
import logo from "../../public/images/logo2-2.png";
import { cls } from "@/util";

// 전체레시피불러오기
const RecipeList = ({
    next,
    text,
    lastDoc,
    currentItems,
    totalItems,
    dataResults,
    filteredFood,
    filteredTime,
    isBest,
}: TypeSearchPageProps) => {
    // dataResults = 검색결과
    // currentItems = 전체레시피(총)
    // totalItems = 전체레시피(8개씩)
    const filteredFoodAndTime = filteredFood?.length && filteredTime?.length;
    const filteredOnlyFood = filteredFood?.length;
    const filteredOnlyTime = filteredTime?.length;

    return (
        <>
            {(text && !dataResults?.length) || currentItems?.length === 0 ? (
                <div className="">
                    <Image
                        src={logo}
                        width={100}
                        height={75}
                        alt="logo_image"
                    />
                    <p className="flex justify-center items-center relative">
                        <span className="font-medium mt-4">
                            첫번째 레시피의 주인공이 되어주세요!
                        </span>
                    </p>
                </div>
            ) : filteredFoodAndTime ? (
                (text ? dataResults! : currentItems!)
                    .filter(
                        (item) =>
                            filteredFood.includes(item.foodCategory!) ||
                            filteredTime.includes(item.cookingTime!)
                    )
                    .map((item) => {
                        return <RecipeListData key={item.id} item={item} />;
                    })
            ) : filteredOnlyFood ? (
                (text ? dataResults! : currentItems!)
                    .filter((item) => filteredFood.includes(item.foodCategory!))
                    .map((item) => {
                        return <RecipeListData key={item.id} item={item} />;
                    })
            ) : filteredOnlyTime ? (
                (text ? dataResults! : currentItems!)
                    .filter((item) => filteredTime.includes(item.cookingTime!))
                    .map((item) => {
                        return <RecipeListData key={item.id} item={item} />;
                    })
            ) : dataResults?.length ? (
                isBest === "viewCount" ? (
                    dataResults
                        .sort(
                            (a: TypeRecipe, b: TypeRecipe) =>
                                b.viewCount! - a.viewCount!
                        )
                        .map((item) => {
                            return <RecipeListData key={item.id} item={item} />;
                        })
                ) : (
                    dataResults.map((item) => {
                        return <RecipeListData key={item.id} item={item} />;
                    })
                )
            ) : totalItems?.length ? (
                totalItems.map((item) => {
                    return <RecipeListData key={item.id} item={item} />;
                })
            ) : (
                <div className="">
                    <Image
                        src={logo}
                        width={100}
                        height={75}
                        alt="logo_image"
                    />
                    <p className="flex justify-center items-center relative">
                        <span className="font-medium mt-4">
                            첫번째 레시피의 주인공이 되어주세요!
                        </span>
                    </p>
                </div>
            )}
            <button
                type="button"
                onClick={next}
                className={cls(
                    "border-1 text-brand100 border-brand100 px-7 py-1 absolute bottom-0 -translate-x-1/2 left-1/2",
                    !lastDoc ||
                        text ||
                        filteredFood?.length ||
                        filteredTime?.length ||
                        !currentItems?.length ||
                        (currentItems || dataResults).length < 8
                        ? "hidden"
                        : ""
                )}
            >
                더보기
            </button>
        </>
    );
};

export default RecipeList;
