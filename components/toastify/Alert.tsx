import { toast } from "react-toastify";

const Alert = (alertText: string) => {
    toast(`${alertText}`, {
        position: "top-right",
        autoClose: 1300,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    return;
};

export default Alert;
