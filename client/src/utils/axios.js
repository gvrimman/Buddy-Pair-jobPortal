import axios from "axios";
import { showError } from "./toast";
import { Navigate } from "react-router-dom";
import { history } from "./history";
// import RefreshTokenErrorRedirection from "../hooks/RefreshTokenErrorRedirecting";

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
				console.error("Failed in retrying request ERROR:", retryError);
				// history.push("/");
				return Promise.reject({
					message: "Refresh token failed. Redirecting to login.",
					status: 401,
				});
			}
		}

		// history.push("/");
		return Promise.reject(error);
	}
);

export default axiosInstance;
