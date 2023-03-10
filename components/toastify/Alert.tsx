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
    autoClose: 2000,
  });
  return;
};

export const toastAlert = (alertText: string) => {
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
};
