import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	jobs: [],
	job: null,
	bookmarkedJobs: [],
	appliedJobs: [],
	isLoading: false,
	error: null,
};

const employeeSlice = createSlice({
	name: "employee",
	initialState,
	reducers: {
		fetchStart: (state) => {
			(state.isLoading = true), (state.error = null);
		},
		fetchError: (state, action) => {
			(state.isLoading = false), (state.error = action.payload);
		},
		fetchJobs: (state, action) => {
			(state.jobs = action.payload), (state.isLoading = false);
		},
		fetchJob: (state, action) => {
			(state.job = action.payload), (state.isLoading = false);
		},
		fetchBookmarkedJobs: (state, action) => {
			(state.bookmarkedJobs = action.payload), (state.isLoading = false);
		},
		setJobBookMarked: (state, action) => {
			state.bookmarkedJobs.push(action.payload);
			state.isLoading = false;
		},
		deleteJobBookmarked: (state, action) => {
			state.bookmarkedJobs = state.bookmarkedJobs.filter(
				(job) => job._id !== action.payload
			);
			state.isLoading = false;
		},
		getAppliedJobs: (state, action) => {
			(state.appliedJobs = action.payload), (state.isLoading = false);
		},
		setApplyJob: (state, action) => {
			state.appliedJobs.push(action.payload);
			state.isLoading = false;
		},	
		deleteAppliedJobs: (state, action) => {
			state.appliedJobs = state.appliedJobs.filter(
				(job) => job._id !== action.payload
			);
			state.isLoading = false;
		}

	},
});

export const {
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
} = employeeSlice.actions;

export default employeeSlice.reducer;
