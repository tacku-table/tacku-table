import { cls } from "@/util";

const ChangeSortedBtn = ({
    dataResults,
    isBest,
    activeBestBtn,
    inactiveBestBtn,
}: any) => {
    return (
        <div className="w-3/4 flex justify-end items-center mb-[20px]">
            {dataResults ? (
                <p className=" text-mono100 mr-[280px]">
                    총&nbsp;
                    <span className="text-red100">{dataResults.length}</span>
                    건의 레시피가 기다리고 있어요!
                </p>
            ) : null}{" "}
            <ul className="flex justify-end">
                <li
                    className={cls(
                        "sorted-btn",
                        isBest === "viewCount"
                            ? "bg-main text-white"
                            : "text-grayText"
                    )}
                    onClick={activeBestBtn}
                >
                    인기순
                </li>
                <li
                    className={cls(
                        "sorted-btn",
                        isBest === "createdAt"
                            ? "bg-main text-white"
                            : "text-grayText"
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
