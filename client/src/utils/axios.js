import axios from "axios";
import { showError, showWarn } from "./toast";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
	baseURL: `${import.meta.env.VITE_BASE_URL}`,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request Interceptor
// Add a request interceptor to include CSRF token
axiosInstance.interceptors.request.use(
	(config) => {
    // Retrieve the CSRF token from the cookies
    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1];

    if (csrfToken) {
      config.headers["X-CSRF-Token"] = csrfToken; // Include token in the headers
    }
    return config;
  },
	(error) => {
		return Promise.reject("Axios request error:", error);
	}
);

// Response Interceptor
axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		// Handle network error (disconnected)
		if (typeof window !== "undefined" && !window.navigator.onLine) {
			showWarn("You are offline. Check your internet connection.", {
				autoClose: false,
				toastId: "offline-warning",
			});
			return Promise.reject({
				message: "Network is offline. Please check your connection.",
			});
		}else if(toast.isActive("offline-warning")){
			toast.dismiss("offline-warning");
		}
		// Handle server errors (API Gateway is unavailable)
		if (error.response?.status >= 500 && error.response?.status < 600) {
			showError("API Gateway is currently unavailable. Please try again later.", {
				autoClose: 10000,
				toastId: "api-unavailable", // Prevent duplicate toasts
			});

			// Optional: Retry logic for recoverable errors
			if (!originalRequest._ErrRetry && error.response?.status === 502) {
				originalRequest._ErrRetry = true; // Avoid infinite retries
				try {
					await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait 3 seconds
					return axiosInstance(originalRequest); // Retry the request
				} catch (retryError) {
					return Promise.reject(retryError);
				}
			}
		}
		if (
			error.response?.status === 401 ||
			(error.response?.status === 402 && !originalRequest._retry)
		) {
			originalRequest._retry = true;
			if (error.response?.status === 402) {
				// history.push("/");
				return Promise.reject(
					new Error(
						"Session expired or token not found. Redirecting to login."
					)
				);
			}
			try {
				const response = await axiosInstance.post(
					"/auth/refresh-token"
				);

				if (response?.data?.statusCode === 200) {
					return axiosInstance(originalRequest);
				}
			} catch (retryError) {
				console.log("Failed in retrying request ERROR:", retryError);
				// history.push("/");
				return Promise.reject({
					message: "Refresh token failed. Redirecting to login.",
					status: 401,
				});
			}
		}
		if (
			error.response?.status === 403 &&
			error.response.data.message === "Invalid CSRF token" &&
			!originalRequest._csrfRetry
		) {
			originalRequest._csrfRetry = true; // Avoid retry loop
			try {
				// Refresh CSRF token
				await axiosInstance.get("/csrf-token");

				// Retry original request with new CSRF token
				originalRequest.headers["X-CSRF-Token"] = document.cookie
				.split("; ")
				.find((row) => row.startsWith("XSRF-TOKEN="))
				?.split("=")[1];
				return axiosInstance.request(originalRequest);
			} catch (csrfRefreshError) {
				console.log("Failed to refresh CSRF token. Redirecting to login.");
				return Promise.reject(csrfRefreshError);
			}
		}
		if(error.code === "ERR_NETWORK" && !error.response) {
			error.response = {};
			error.response.data = {};
			error.response.data.message = "API is Unavaliable";
		}
		// history.push("/");
		return Promise.reject(error);
	}
);

export default axiosInstance;
