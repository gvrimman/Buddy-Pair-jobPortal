import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	jobs: [], // all jobs list
	job: null,
	profiles: [], // all similar profiles
	profile: null,
	bookmarkedJobs: [],
	appliedJobs: [],
	companies: [],
	company: null,
	isLoading: false,
	error: null,
	hasMore: true,
	pagination: null,
	query: null,
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
			state.isLoading = false;
			// Filter out duplicates by checking job IDs
			const newJobs = action.payload.jobs.filter(
				(newJob) =>
					!state.jobs.some(
						(existingJob) => existingJob._id === newJob._id
					)
			);
			state.jobs = [...state.jobs, ...newJobs];
			state.hasMore = action.payload.hasMore;
		},
		clearJobs: (state, action) => {
			state.isLoading = false;
			state.jobs = [];
		},
		fetchJob: (state, action) => {
			(state.job = action.payload), (state.isLoading = false);
		},
		fetchProfiles: (state, action) => {
			state.isLoading = false;
			// Filter out duplicates by checking profiles IDs
			const newProfiles = action.payload.profiles.filter(
				(newProfiles) =>
					!state.profiles.some(
						(existingProfiles) => existingProfiles._id === newProfiles._id
					)
			);
			state.profiles = [...state.profiles, ...newProfiles];
			state.hasMore = action.payload.hasMore;
		},
		clearProfiles: (state, action) => {
			state.isLoading = false;
			state.profiles = [];
		},
		fetchProfile: (state, action) => {
			(state.profile = action.payload), (state.isLoading = false);
		},
		fetchBookmarkedJobs: (state, action) => {
			state.isLoading = false;
			state.bookmarkedJobs = action.payload.bookmarkedJobs;
			state.pagination = action.payload.pagination;
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
			state.appliedJobs = action.payload.appliedJobs;
			state.pagination = action.payload.pagination;
			state.isLoading = false;
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
		clearCompanies: (state, action) => {
			state.isLoading = false;
			state.companies = [];
		},
		fetchCompany(state, action) {
			state.company = action.payload;
			state.isLoading = false;
		},
		setQuery: (state, action) => {
			state.query = action.payload;
		},
		clearQuery: (state, action) => {			
			state.query = null;
		},
	},
});

export const {
	fetchStart,
	fetchError,
	fetchJobs,
	fetchJob,
	fetchProfiles,
	clearProfiles,
	fetchProfile,
	fetchBookmarkedJobs,
	setJobBookMarked,
	deleteJobBookmarked,
	getAppliedJobs,
	setApplyJob,
	deleteAppliedJobs,
	fetchCompanies,
	fetchCompany,
	clearJobs,
	clearCompanies,
	setQuery,
	clearQuery,
} = employeeSlice.actions;

export default employeeSlice.reducer;
