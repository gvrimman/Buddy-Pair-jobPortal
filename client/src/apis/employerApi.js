import axiosInstance from "./../utils/axios";
import { showSuccess, showError } from "./../utils/toast";
import {
	fetchStart,
	fetchJobs,
	fetchJob,
	createJob,
	updateJob,
	deleteJob,
	fetchError,
	fetchCandidates,
} from "../Redux/reducers/employerReducer";

export const createAJob = (data) => async (dispatch) => {
	dispatch(fetchStart());
	try {
		const response = await axiosInstance.post("/employer/post-job", data);
		showSuccess(response?.data?.message);
		dispatch(createJob(response?.data?.data));
	} catch (error) {}
};
export const getPostedJobs = () => async (dispatch) => {
	dispatch(fetchStart());
	try {
		const response = await axiosInstance.get("/employer/get-posted-jobs");
		dispatch(fetchJobs(response?.data?.data?.totalJobs));
	} catch (error) {
		dispatch(fetchError(error.message));
		showError(error.message);
	}
};

export const getJobById = (id) => async (dispatch) => {
	dispatch(fetchStart());
	try {
		const response = await axiosInstance.get(`/employer/job/${id}`);
		console.log(response)
		dispatch(fetchJob(response?.data?.data));
	} catch (error) {
		dispatch(fetchError(error.message));
		showError(error.message);
	}
};

export const updateAJob = (id, data) => async (dispatch) => {
	dispatch(fetchStart());
	try {
		const response = await axiosInstance.put(
			`/employer/job-update/${id}`,
			data
		);
		showSuccess(response?.data?.message);
		dispatch(updateJob(response?.data?.data));
	} catch (error) {
		dispatch(fetchError(error.message));
		showError(error.message);
	}
};

export const deleteAJob = (id) => async (dispatch) => {
	dispatch(fetchStart());
	try {
		const response = await axiosInstance.delete(
			`/employer/delete-job/${id}`
		);
		showSuccess(response?.data?.message);
		dispatch(deleteJob(id));
	} catch (error) {
		dispatch(fetchError(error.message));
		showError(error.message);
	}
};

export const getCandidates = (query) => async (dispatch) => {
	dispatch(fetchStart());
	try {
		const response = await axiosInstance.get("/employer/candidates", {
			params: { ...query },
		});
		console.log(response?.data?.data);
		dispatch(fetchCandidates(response?.data?.data));
	} catch (error) {
		dispatch(fetchError(error.message));
		showError(error.message);
	}
};
