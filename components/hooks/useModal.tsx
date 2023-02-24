import { useContext } from "react";
import { ModalSetterContext } from "../../context/ModalProvider";

function useModal() {
    const setModalState = useContext(ModalSetterContext);

    const openModal = ({ type, props = null }: any) => {
        setModalState({ type, props });
    };

    const closeModal = () => {
        setModalState({ type: null, props: null });
    };

    return { openModal, closeModal };
}

export default useModal;
