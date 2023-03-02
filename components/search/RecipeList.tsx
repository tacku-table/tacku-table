import RecipeListData from "./RecipeListData";
interface TypeRecipeList {
    dataResults: RecipeProps[];
    filteredFood?: string[];
    filteredTime?: string[];
}

// 전체레시피불러오기
const RecipeList = ({
    currentItems,
    totalItems,
    dataResults,
    filteredFood,
    filteredTime,
}: any) => {
    // dataResults = 검색결과
    // totalItems = 전체레시피(6개씩)
    // currentItems = 전체레시피(총)
    const filteredFoodAndTime =
        (!dataResults?.length ? currentItems?.length : dataResults?.length) &&
        filteredFood?.length &&
        filteredTime?.length;
    const filteredOnlyFood =
        (!dataResults?.length ? currentItems?.length : dataResults?.length) &&
        filteredFood?.length;
    const filteredOnlyTime =
        (!dataResults?.length ? currentItems?.length : dataResults?.length) &&
        filteredTime?.length;

    return (
        <div className="grid grid-cols-3 gap-x-4 gap-y-9">
            {filteredFoodAndTime ? (
                (!dataResults?.length ? currentItems : dataResults)
                    .filter(
                        (item: any) =>
                            filteredFood.includes(item.foodCategory) ||
                            filteredTime.includes(item.cookingTime)
                    )
                    .map((item: any) => {
                        return <RecipeListData key={item.id} item={item} />;
                    })
            ) : filteredOnlyFood ? (
                (!dataResults?.length ? currentItems : dataResults)
                    .filter((item: any) =>
                        filteredFood.includes(item.foodCategory)
                    )
                    .map((item: any) => {
                        return <RecipeListData key={item.id} item={item} />;
                    })
            ) : filteredOnlyTime ? (
                (!dataResults?.length ? currentItems : dataResults)
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
