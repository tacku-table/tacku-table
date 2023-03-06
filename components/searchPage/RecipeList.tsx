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
}: TypeSearchPageProps) => {
    // dataResults = 검색결과
    // currentItems = 전체레시피(총)
    // totalItems = 전체레시피(6개씩)
    const filteredFoodAndTime = filteredFood?.length && filteredTime?.length;
    const filteredOnlyFood = filteredFood?.length;
    const filteredOnlyTime = filteredTime?.length;

    return (
        <div className="grid grid-cols-3 gap-x-4 gap-y-9 relative pb-24">
            {text && !dataResults?.length ? (
                <div>
                    <Image
                        src={logo}
                        width={200}
                        height={200}
                        alt="logo_image"
                    />
                    <p className="text-[#cf8c36] mt-4">
                        해당 게시물이 존재하지 않습니다.
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
                dataResults.map((item) => {
                    return <RecipeListData key={item.id} item={item} />;
                })
            ) : totalItems?.length ? (
                totalItems.map((item) => {
                    return <RecipeListData key={item.id} item={item} />;
                })
            ) : (
                <div>게시물이 존재하지 않습니다.</div>
            )}
            <button
                type="button"
                onClick={next}
                className={cls(
                    "border-[2px] text-brand100 border-brand100 px-7 py-1 absolute bottom-0 -translate-x-1/2 left-1/2",
                    !lastDoc ||
                        text ||
                        filteredFood?.length ||
                        filteredTime?.length
                        ? "hidden"
                        : ""
                )}
            >
                더보기
            </button>
        </div>
    );
};

export default RecipeList;
