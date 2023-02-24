import useModal from "@/components/hooks/useModal";

const Prac = () => {
    const { openModal } = useModal();

    const onClickButton1 = () => {
        openModal({ type: "first" });
    };

    const onClickButton2 = () => {
        openModal({ type: "second" });
    };

    return (
        <div>
            <button onClick={onClickButton1}>Click Me !</button>
            <button className="blue" onClick={onClickButton2}>
                Click Me !
            </button>
        </div>
    );
};

export default Prac;
