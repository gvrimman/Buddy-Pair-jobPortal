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
	fetchCandidate,
	fetchApplicants,
	acceptJob,
	fetchAcceptedJobs,
	rejectJob,
	fetchRejectedJobs,
	fetchCompanies,
	fetchCompany,
} from "../Redux/reducers/employerReducer";

export const createAJob = (data) => async (dispatch) => {
	dispatch(fetchStart());
	try {
		const response = await axiosInstance.post("/employer/post-job", data);
		showSuccess(response?.data?.message);
		dispatch(createJob(response?.data?.data));
	} catch (error) {
		dispatch(fetchError(error.message));
		showError(error?.response?.data?.message);
	}
};
export const getPostedJobs =
	(page = 1, limit) =>
	async (dispatch) => {
		dispatch(fetchStart());
		try {
			const response = await axiosInstance.get(
				`/employer/get-posted-jobs?page=${page}&limit=${limit}`
			);

			dispatch(
				fetchJobs({
					jobs: response?.data?.data?.jobs,
					hasMore: response?.data?.data?.hasMore,
				})
			);
		} catch (error) {
			dispatch(fetchError(error.message));
			showError(error?.response?.data?.message);
		}
	};

export const getJobById = (id) => async (dispatch) => {
	dispatch(fetchStart());
	try {
		const response = await axiosInstance.get(`/employer/job/${id}`);
		dispatch(fetchJob(response?.data?.data));
	} catch (error) {
		dispatch(fetchError(error.message));
		showError(error?.response?.data?.message);
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
		showError(error?.response?.data?.message);
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
		showError(error?.response?.data?.message);
	}
};

export const getCandidates = (query) => async (dispatch) => {
	dispatch(fetchStart());
	try {
		const response = await axiosInstance.get("/employer/candidates", {
			params: { ...query },
		});
		dispatch(fetchCandidates(response?.data?.data));
	} catch (error) {
		dispatch(fetchError(error.message));
		showError(error?.response?.data?.message);
	}
};

export const getCandidateById = (id) => async (dispatch) => {
	dispatch(fetchStart());
	try {
		const response = await axiosInstance.get(`/employer/candidate/${id}`);
		dispatch(fetchCandidate(response?.data?.data));
	} catch (error) {
		dispatch(fetchError(error.message));
		showError(error?.response?.data?.message);
	}
};

export const getApplicants =
	(page = 1, limit = 5) =>
	async (dispatch) => {
		dispatch(fetchStart());
		try {
			const response = await axiosInstance.get(
				`/employer/applicants?page=${page}&limit=${limit}`
			);
			dispatch(fetchApplicants(response?.data?.data));
		} catch (error) {
			dispatch(fetchError(error.message));
			showError(error?.response?.data?.message);
		}
	};

export const getJobApplicants =
	({ id, page = 1, limit = 5 }) =>
	async (dispatch) => {
		dispatch(fetchStart());
		try {
			const response = await axiosInstance.get(
				`/employer/job-applicants/${id}?page=${page}&limit=${limit}`
			);
			dispatch(fetchApplicants(response?.data?.data));
		} catch (error) {
			dispatch(fetchError(error.message));
			showError(error?.response?.data?.message);
		}
	};

export const acceptAJob = (jobId, userId) => async (dispatch) => {
	dispatch(fetchStart());
	try {
		const response = await axiosInstance.post("/employer/job-accept", {
			jobId,
			userId,
		});
		showSuccess(response?.data?.message);
		dispatch(acceptJob(response?.data?.data));
	} catch (error) {
		dispatch(fetchError(error.message));
		showError(error?.response?.data?.message);
	}
};

export const getAcceptedJobs = () => async (dispatch) => {
	dispatch(fetchStart());
	try {
		const response = await axiosInstance.get("/employer/accepted-jobs");
		dispatch(fetchAcceptedJobs(response?.data?.data));
	} catch (error) {
		dispatch(fetchError(error.message));
		showError(error?.response?.data?.message);
	}
};

export const rejectAJob = (jobId, userId) => async (dispatch) => {
	dispatch(fetchStart());
	try {
		const response = await axiosInstance.post("/employer/job-reject", {
			jobId,
			userId,
		});
		dispatch(rejectJob(response?.data?.data));
		showSuccess(response?.data?.message);
	} catch (error) {
		dispatch(fetchError(error.message));
		showError(error?.response?.data?.message);
	}
};

export const getRejectedJobs = () => async (dispatch) => {
	dispatch(fetchStart());
	try {
		const response = await axiosInstance.get("/employer/rejected-jobs");
		dispatch(fetchRejectedJobs(response?.data?.data));
	} catch (error) {
		dispatch(fetchError(error.message));
		showError(error?.response?.data?.message);
	}
};

export const getAllCompanies = (query) => async (dispatch) => {
	dispatch(fetchStart());
	try {
		const response = await axiosInstance.get("/employer/companies", {
			params: { ...query },
		});
		dispatch(fetchCompanies(response?.data?.data));
	} catch (error) {
		dispatch(fetchError(error.message));
		showError(error?.response?.data?.message);
	}
};

export const getCompany = (id) => async (dispatch) => {
	dispatch(fetchStart());
	try {
		const response = await axiosInstance.get(`/employer/company/${id}`);
		dispatch(fetchCompany(response?.data?.data));
	} catch (error) {
		dispatch(fetchError(error.message));
		showError(error?.response?.data?.message);
	}
};
