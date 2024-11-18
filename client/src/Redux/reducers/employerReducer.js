import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	jobs: [],
	job: null,
	candidates: [],
	isLoading: false,
	error: null,
};

const employerSlice = createSlice({
	name: "employer",
	initialState,
	reducers: {
		fetchStart(state) {
			(state.isLoading = true), (state.error = null);
		},
		fetchJobs(state, action) {
			state.jobs = action.payload;
			state.isLoading = false;
		},
		fetchJob(state, action) {
			state.job = action.payload;
			state.isLoading = false;
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
			state.candidates = action.payload;
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
} = employerSlice.actions;

export default employerSlice.reducer;
