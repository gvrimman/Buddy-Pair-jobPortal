import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Default configuration for toast notifications.
 * @type {import("react-toastify").ToastOptions}
 */
const toastConfig = {
  position: "top-right",
  limit: 1,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
  progress: undefined,
};

/**
 * Displays a success toast notification.
 * @param {string} message - The success message to display.
 * @param {import("react-toastify").ToastOptions} [config={}] - Optional toast configuration overrides.
 */
export const showSuccess = (message, config = {}) => {
  toast.success(message, { ...toastConfig, ...config });
};

/**
 * Displays an error toast notification.
 * @param {string} message - The error message to display.
 * @param {import("react-toastify").ToastOptions} [config={}] - Optional toast configuration overrides.
 */
export const showError = (message, config = {}) => {
  toast.error(message, { ...toastConfig, ...config });
};

/**
 * Displays a warning toast notification.
 * @param {string} message - The warning message to display.
 * @param {import("react-toastify").ToastOptions} [config={}] - Optional toast configuration overrides.
 */
export const showWarn = (message, config = {}) => {
  toast.warn(message, { ...toastConfig, ...config });
};
