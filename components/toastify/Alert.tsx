import { toast } from "react-toastify";

export const Success = (alertText: string) => {
    toast.success(`${alertText}`, {
        position: "top-right",
        autoClose: 1300,
    });
    return;
};
export const Warn = (alertText: string) => {
    toast.warn(`${alertText}`, {
        position: "top-right",
        autoClose: 1300,
    });
    return;
};
export const Error = (alertText: string) => {
    toast.error(`${alertText}`, {
        position: "top-right",
        autoClose: 1300,
    });
    return;
};
