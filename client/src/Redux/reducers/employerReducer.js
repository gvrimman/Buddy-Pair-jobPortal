import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	jobs: [], // posted jobs by employer
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
	// query: null,
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
			const newJobs = action.payload.jobs.filter(
				(newJob) =>
					!state.jobs.some(
						(existingJob) => existingJob._id === newJob._id
					)
			);
			state.jobs = [...state.jobs, ...newJobs];
			state.hasMore = action.payload.hasMore;
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
			const newCandidates = action.payload.candidates.filter(
				(candidate) =>
					!state.candidates.some(
						(existingCandidate) =>
							existingCandidate._id === candidate._id
					)
			);
			state.candidates = [...state.candidates, ...newCandidates];
			state.hasMore = action.payload.hasMore;
		},
		clearCandidates(state, action) {
			state.isLoading = false;
			state.candidates = [];
		},
		fetchCandidate(state, action) {
			state.isLoading = false;
			state.candidate = action.payload;
		},
		fetchApplicants(state, action) {
			state.isLoading = false;
			const newApplicants = action.payload.applicants.filter(
				(applicant) =>
					!state.applicants.some(
						(existingApplicant) =>
							existingApplicant._id === applicant._id
					)
			);
			state.applicants = [...state.applicants, ...newApplicants];
			state.hasMore = action.payload.hasMore;
		},
		clearApplicants(state, action) {
			state.isLoading = false;
			state.applicants = [];
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
			const newCompanies = action.payload.companies.filter(
				(newCompany) =>
					!state.companies.some(
						(existingCompany) =>
							existingCompany._id === newCompany._id
					)
			);
			state.companies = [...state.companies, ...newCompanies];
			state.hasMore = action.payload.hasMore;
		},
		fetchCompany(state, action) {
			state.company = action.payload;
			state.isLoading = false;
		},
		clearCompanies: (state, action) => {
			state.isLoading = false;
			state.companies = [];
		},
		fetchError(state, action) {
			(state.isLoading = false), (state.error = action.payload);
		},
		// setQuery: (state, action) => {
		// 	state.query = action.payload;
		// },
		// clearQuery: (state, action) => {
		// 	state.query = null;
		// },
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
	clearCandidates,
	clearCompanies,
	clearApplicants,
	// setQuery,
	// clearQuery,
} = employerSlice.actions;

export default employerSlice.reducer;
