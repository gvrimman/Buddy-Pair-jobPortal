import axios from "axios";
// import RefreshTokenErrorRedirection from "../hooks/RefreshTokenErrorRedirecting";

const axiosInstance = axios.create({
	baseURL: `${import.meta.env.VITE_BASE_URL}`,
	withCredentials: true,
});

// // Request Interceptor
axiosInstance.interceptors.request.use(
	(config) => {
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
				return Promise.reject(
					new Error("Session expired. Please login again.")
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
				return Promise.reject({
					message: "Refresh token failed. Please login again.",
					status: 401,
				});
			}
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;
