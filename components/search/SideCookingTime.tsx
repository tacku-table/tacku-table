const categoryList2 = [
    { name: "15분이하" },
    { name: "30분이하" },
    { name: "1시간이하" },
    { name: "1시간이상" },
];

const SideCookingTime = ({ onCheckedItem2, filteredTime }: any) => {
    return (
        <div className="flex flex-col">
            <h4 className="mb-3 text-sm text-mono80">조리 시간</h4>
            <div className="flex flex-col justify-center gap-y-3 ml-5">
                {categoryList2.map((item: any) => {
                    return (
                        <div key={item.name}>
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
                                {item.name}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SideCookingTime;
