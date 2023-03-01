import { cls } from "@/util";

const ChangeSortedBtn = ({
    dataResults,
    isBest,
    activeBestBtn,
    inactiveBestBtn,
    filteredFood,
    filteredTime,
}: any) => {
    const filteredFoodAndTime =
        dataResults?.length && filteredFood?.length && filteredTime?.length;
    const filteredOnlyFood = dataResults?.length && filteredFood?.length;
    const filteredOnlyTime = dataResults?.length && filteredTime?.length;

    return (
        <div className="w-4/5 flex justify-end items-center mb-[20px]">
            {dataResults ? (
                <p className=" text-mono100 mr-[330px]">
                    총&nbsp;
                    <span className="text-red100">
                        {filteredFoodAndTime
                            ? dataResults.filter(
                                  (item: any) =>
                                      filteredFood.includes(
                                          item.foodCategory
                                      ) ||
                                      filteredTime.includes(item.cookingTime)
                              ).length
                            : filteredOnlyFood
                            ? dataResults.filter((item: any) =>
                                  filteredFood.includes(item.foodCategory)
                              ).length
                            : filteredOnlyTime
                            ? dataResults.filter((item: any) =>
                                  filteredTime.includes(item.cookingTime)
                              ).length
                            : dataResults.length}
                    </span>
                    건의 레시피가 기다리고 있어요!
                </p>
            ) : null}
            <ul className="flex justify-end">
                <li
                    className={cls(
                        "sorted-btn",
                        isBest === "viewCount"
                            ? "bg-brand100 text-white"
                            : "text-mono80"
                    )}
                    onClick={activeBestBtn}
                >
                    인기순
                </li>
                <li
                    className={cls(
                        "sorted-btn",
                        isBest === "createdAt"
                            ? "bg-brand100 text-white"
                            : "text-mono80"
                    )}
                    onClick={inactiveBestBtn}
                >
                    최신순
                </li>
            </ul>
        </div>
    );
};

export default ChangeSortedBtn;
