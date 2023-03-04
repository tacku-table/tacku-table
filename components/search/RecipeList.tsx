import Image from "next/image";
import RecipeListData from "./RecipeListData";
import logo from "../../public/images/logo2-2.png";

interface TypeRecipeList {
    dataResults: RecipeProps[];
    filteredFood?: string[];
    filteredTime?: string[];
}

// 전체레시피불러오기
const RecipeList = ({
    text,
    currentItems,
    totalItems,
    dataResults,
    filteredFood,
    filteredTime,
}: any) => {
    // dataResults = 검색결과
    // currentItems = 전체레시피(총)
    // totalItems = 전체레시피(6개씩)
    const filteredFoodAndTime = filteredFood?.length && filteredTime?.length;
    const filteredOnlyFood = filteredFood?.length;
    const filteredOnlyTime = filteredTime?.length;

    return (
        <div className="grid grid-cols-3 gap-x-4 gap-y-9">
            {text && !dataResults.length ? (
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
                (text ? dataResults : currentItems)
                    .filter(
                        (item: any) =>
                            filteredFood.includes(item.foodCategory) ||
                            filteredTime.includes(item.cookingTime)
                    )
                    .map((item: any) => {
                        return <RecipeListData key={item.id} item={item} />;
                    })
            ) : filteredOnlyFood ? (
                (text ? dataResults : currentItems)
                    .filter((item: any) =>
                        filteredFood.includes(item.foodCategory)
                    )
                    .map((item: any) => {
                        return <RecipeListData key={item.id} item={item} />;
                    })
            ) : filteredOnlyTime ? (
                (text ? dataResults : currentItems)
                    .filter((item: any) =>
                        filteredTime.includes(item.cookingTime)
                    )
                    .map((item: any) => {
                        return <RecipeListData key={item.id} item={item} />;
                    })
            ) : dataResults.length ? (
                dataResults.map((item: any) => {
                    return <RecipeListData key={item.id} item={item} />;
                })
            ) : totalItems?.length ? (
                totalItems.map((item: any) => {
                    return <RecipeListData key={item.id} item={item} />;
                })
            ) : (
                <div>게시물이 존재하지 않습니다.</div>
            )}
        </div>
    );
};

export default RecipeList;
