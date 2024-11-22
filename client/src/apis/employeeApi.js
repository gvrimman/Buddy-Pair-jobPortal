import axiosInstance from "./../utils/axios";
import { showError, showSuccess } from "./../utils/toast";
import {
	fetchStart,
	fetchError,
	fetchJobs,
	fetchJob,
	fetchBookmarkedJobs,
	setJobBookMarked,
	deleteJobBookmarked,
	getAppliedJobs,
	setApplyJob,
	deleteAppliedJobs,
} from "../Redux/reducers/employeeReducer";

export const getJobs = (query) => async (dispatch) => {
	dispatch(fetchStart());
	try {
		const response = await axiosInstance.get("/employee/jobs", {
			params: { ...query },
		});
		dispatch(fetchJobs(response?.data?.data));
	} catch (error) {
		dispatch(fetchError(error.message));
		showError(error?.response?.data?.message);
	}
};

export const getJobById = (id) => async (dispatch) => {
	dispatch(fetchStart());
	try {
		const response = await axiosInstance.get(`/employee/job/${id}`);
		dispatch(fetchJob(response?.data?.data));
	} catch (error) {
		dispatch(fetchError(error.message));
		showError(error?.response?.data?.message);
	}
};

export const getBookmarkedJobs = () => async (dispatch) => {
	dispatch(fetchStart());
	try {
		const response = await axiosInstance.get("/employee/bookmarked-jobs");
		dispatch(fetchBookmarkedJobs(response?.data?.data?.bookmarkedJobs));
	} catch (error) {
		dispatch(fetchError(error.message));
		showError(error?.response?.data?.message);
	}
};

export const bookmarkAJob = (id) => async (dispatch) => {
	dispatch(fetchStart());
	try {
		const response = await axiosInstance.post(
			`/employee/bookmark-job/${id}`
		);

		showSuccess(response?.data?.message);
		dispatch(setJobBookMarked(response?.data?.data));
	} catch (error) {
		dispatch(fetchError(error.message));
		showError(error?.response?.data?.message);
	}
};


export const deleteBookmarkedJob = (id) => async (dispatch) => {
	dispatch(fetchStart());
	try {
		const response = await axiosInstance.delete(
			`/employee/bookmark-job/${id}`
		);
		showSuccess(response?.data?.message);
		dispatch(deleteJobBookmarked(id));
	} catch (error) {
		dispatch(fetchError(error.message));
		showError(error?.response?.data?.message);
	}
};

export const applyAjob = (id) => async (dispatch) => {
	dispatch(fetchStart());
	try {
		const response = await axiosInstance.post(`/employee/apply-job/${id}`);
		showSuccess(response?.data?.message);
		dispatch(setApplyJob(response?.data?.data));
	} catch (error) {
		dispatch(fetchError(error.message));
		showError(error?.response?.data?.message);
	}
}

export const getAppiedJobs = () => async (dispatch) => {
	dispatch(fetchStart());
	try {
		const response = await axiosInstance.get("/employee/applied-jobs");
		dispatch(getAppliedJobs(response?.data?.data[0]?.appliedJobs));
	} catch (error) {
		dispatch(fetchError(error.message));
		showError(error?.response?.data?.message);
	}
};

export const deleteAAppiedJob = (id) => async (dispatch) => {
	dispatch(fetchStart());
	try {
		const response = await axiosInstance.delete(
			`/employee/delete-job/${id}`
		);
		showSuccess(response?.data?.message);
		dispatch(deleteAppliedJobs(id));
	} catch (error) {
		dispatch(fetchError(error.message));
		showError(error?.response?.data?.message);
	}
}