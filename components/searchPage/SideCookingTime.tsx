interface TypeTimeProps {
    onCheckedTime: (checked: boolean, newItem: string) => void;
    filteredTime: string[];
}

const categoryTimeList = [
    { name: "15분이하" },
    { name: "30분이하" },
    { name: "1시간이하" },
    { name: "1시간이상" },
];

const SideCookingTime = ({ onCheckedTime, filteredTime }: TypeTimeProps) => {
    return (
        <div className="flex flex-col">
            <h4 className="mb-3 text-sm text-mono80">조리 시간</h4>
            <div className="flex flex-col justify-center gap-y-3">
                {categoryTimeList.map((item) => {
                    return (
                        <div key={item.name}>
                            <input
                                type="checkbox"
                                id={item.name}
                                onChange={(e) => {
                                    onCheckedTime(
                                        e.target.checked,
                                        e.target.id
                                    );
                                }}
                                checked={
                                    filteredTime?.includes(item.name)
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
