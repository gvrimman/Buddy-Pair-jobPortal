import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	jobs: [],
	job: null,
	candidates: [],
	candidate: null,
	applicants: [],
	acceptedApplicants: [],
	rejected: [],
	companies: [],
	company: null,
	isLoading: false,
	error: null,
	hasMore: true,
	pagination: null,
};

const employerSlice = createSlice({
	name: "employer",
	initialState,
	reducers: {
		fetchStart(state) {
			(state.isLoading = true), (state.error = null);
		},
		fetchJobs(state, action) {
			state.isLoading = false;
			state.jobs = action.payload.jobs;
			state.pagination = action.payload.pagination;
		},
		fetchJob(state, action) {
			state.isLoading = false;
			state.job = action.payload;
			
		},
		createJob(state, action) {
			state.jobs.push(action.payload);
			state.isLoading = false;
		},
		updateJob(state, action) {
			const index = state.jobs.findIndex(
				(job) => job._id === action.payload._id
			);
			if (index !== -1) state.jobs[index] = action.payload;
			state.isLoading = false;
		},
		deleteJob(state, action) {
			state.jobs = state.jobs.filter((job) => job._id !== action.payload);
		},
		fetchCandidates(state, action) {
			state.isLoading = false;
			state.candidates = action.payload.candidates;
			state.hasMore = action.payload.hasMore;
		},
		fetchCandidate(state, action) {
			state.candidate = action.payload;
			state.isLoading = false;
		},
		fetchApplicants(state, action) {
			state.applicants = action.payload;
			state.isLoading = false;
		},
		acceptJob(state, action) {
			state.acceptedApplicants.push(action.payload);
			state.isLoading = false;
		},
		fetchAcceptedJobs(state, action) {
			state.acceptedApplicants = action.payload;
			state.isLoading = false;
		},
		rejectJob(state, action) {
			state.rejected.push(action.payload);
			state.isLoading = false;
		},
		fetchRejectedJobs(state, action) {
			state.rejected = action.payload;
			state.isLoading = false;
		},
		fetchCompanies(state, action) {
			state.isLoading = false;
			state.companies = action.payload.companies;
			state.hasMore = action.payload.hasMore;
		},
		fetchCompany(state, action) {
			state.company = action.payload;
			state.isLoading = false;
		},
		fetchError(state, action) {
			(state.isLoading = false), (state.error = action.payload);
		},
	},
});

export const {
	fetchStart,
	fetchJobs,
	fetchJob,
	updateJob,
	createJob,
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
} = employerSlice.actions;

export default employerSlice.reducer;
