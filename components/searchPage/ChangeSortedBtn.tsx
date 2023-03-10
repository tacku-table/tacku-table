import { cls } from "@/util";

const ChangeSortedBtn = ({
    text,
    currentItems,
    dataResults,
    isBest,
    activeBestBtn,
    inactiveBestBtn,
    filteredFood,
    filteredTime,
}: TypeSearchPageProps) => {
    // dataResults = 검색결과
    // totalItems = 전체레시피(6개씩)
    // currentItems = 전체레시피(총)

    const filteredFoodAndTime = filteredFood?.length && filteredTime?.length;
    const filteredOnlyFood = filteredFood?.length;
    const filteredOnlyTime = filteredTime?.length;

    return (
        <div className="w-4/5 flex justify-between items-center relative mb-4">
            <ul className="flex justify-end absolute right-0">
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
            <p
                className={cls(
                    "text-mono100 flex md:justify-center items-center sm:ml-4 lg:ml-5",
                    text ? "" : "hidden"
                )}
            >
                <span className="text-mono100 lg:ml-7">
                    Results&nbsp;&nbsp;
                </span>
                <span className="text-red100 text-lg lg:text-base">
                    {dataResults
                        ? filteredFoodAndTime
                            ? dataResults.filter(
                                  (item) =>
                                      filteredFood.includes(
                                          item.foodCategory!
                                      ) ||
                                      filteredTime.includes(item.cookingTime!)
                              ).length
                            : filteredOnlyFood
                            ? dataResults.filter((item) =>
                                  filteredFood.includes(item.foodCategory!)
                              ).length
                            : filteredOnlyTime
                            ? dataResults.filter((item) =>
                                  filteredTime.includes(item.cookingTime!)
                              ).length
                            : dataResults.length
                        : null}
                </span>
            </p>
            <p
                className={cls(
                    "text-white md:text-mono100 flex lg:justify-center items-center",
                    dataResults?.length || (text && !dataResults?.length)
                        ? "hidden"
                        : ""
                )}
            >
                <span className="text-mono100 lg:ml-7">Total&nbsp;&nbsp;</span>
                <span className="text-red100 text-lg">
                    {currentItems?.length
                        ? filteredFoodAndTime
                            ? currentItems.filter(
                                  (item) =>
                                      filteredFood.includes(
                                          item.foodCategory!
                                      ) ||
                                      filteredTime.includes(item.cookingTime!)
                              ).length
                            : filteredOnlyFood
                            ? currentItems.filter((item) =>
                                  filteredFood.includes(item.foodCategory!)
                              ).length
                            : filteredOnlyTime
                            ? currentItems.filter((item) =>
                                  filteredTime.includes(item.cookingTime!)
                              ).length
                            : currentItems.length
                        : 0}
                </span>
            </p>
        </div>
    );
};

export default ChangeSortedBtn;
