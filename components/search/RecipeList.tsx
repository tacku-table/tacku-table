import RecipeListData from "./RecipeListData";
interface TypeRecipeList {
    dataResults: RecipeProps[];
    filteredFood?: string[];
    filteredTime?: string[];
}

// 전체레시피불러오기
const RecipeList = ({ dataResults, filteredFood, filteredTime }: any) => {
    const filteredFoodAndTime =
        dataResults?.length && filteredFood?.length && filteredTime?.length;
    const filteredOnlyFood = dataResults?.length && filteredFood?.length;
    const filteredOnlyTime = dataResults?.length && filteredTime?.length;

    return (
        <div className="grid grid-cols-3 gap-x-4 gap-y-9">
            {filteredFoodAndTime ? (
                dataResults
                    .filter(
                        (item: any) =>
                            filteredFood.includes(item.foodCategory) ||
                            filteredTime.includes(item.cookingTime)
                    )
                    .map((item: any) => {
                        return <RecipeListData key={item.id} item={item} />;
                    })
            ) : filteredOnlyFood ? (
                dataResults
                    .filter((item: any) =>
                        filteredFood.includes(item.foodCategory)
                    )
                    .map((item: any) => {
                        return <RecipeListData key={item.id} item={item} />;
                    })
            ) : filteredOnlyTime ? (
                dataResults
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
            ) : (
                <div>게시물이 존재하지 않습니다.</div>
            )}
        </div>
    );
};

export default RecipeList;
