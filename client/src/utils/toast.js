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

export const showSuccess = (message) => {
  toast.success(message, toastConfig);
};

export const showError = (message) => {
  toast.error(message, toastConfig);
};
