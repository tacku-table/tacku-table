const categoryList2 = [
    { name: "15분이하" },
    { name: "30분이하" },
    { name: "1시간이하" },
    { name: "1시간이상" },
];

const SideCookingTime = ({ onCheckedItem2, filteredTime }: any) => {
    return (
        <div className="flex flex-col mt-7">
            <h4 className="mb-4 text-sm text-mono80">조리 시간</h4>
            <div className="flex flex-col justify-center gap-y-3 ml-5">
                {categoryList2.map((item: any) => {
                    return (
                        <label key={item.name}>
                            <input
                                type="checkbox"
                                id={item.name}
                                onChange={(e) => {
                                    onCheckedItem2(
                                        e.target.checked,
                                        e.target.id
                                    );
                                }}
                                checked={
                                    filteredTime.includes(item.name)
                                        ? true
                                        : false
                                }
                            />
                            <label htmlFor={item.name} className="ml-2">
                                <span>{item.name}</span>
                            </label>
                        </label>
                    );
                })}
            </div>
        </div>
    );
};

export default SideCookingTime;
