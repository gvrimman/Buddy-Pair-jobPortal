import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastConfig = {
  position: "top-right",
  limit:1,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme:"light",
  progress: undefined,
};

export const showSuccess = (message, config={}) => {
  toast.success(message, {...toastConfig, ...config});
};

export const showError = (message, config = {}) => {
  toast.error(message, { ...toastConfig, ...config });
};

export const showWarn = (message, config = {}) => {
  toast.warn(message, { ...toastConfig, ...config });
};
