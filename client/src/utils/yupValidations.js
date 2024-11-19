import * as Yup from "yup";

const signupValidations = Yup.object().shape({
	name: Yup.string().required("Name is Required"),
	email: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
	contactNumber: Yup.string()
		.required("Contact Number is required")
		.min(10, "Minimum 10 characters"),
	password: Yup.string()
		.required("Password is required")
		.min(3, "Minimum 8 characters"),
	confirmPassword: Yup.string()
		.required("Confirm Password is required")
		.oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const loginValidations = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
	password: Yup.string()
		.required("Password is required")
		.min(3, "Minimum 8 characters"),
});

// const today = new Date();
// const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

const userInfoValidation = Yup.object().shape({
	gender: Yup.string().required("Please select your gender type"),
	dob: Yup.date()
		.nullable()
		.required("Date of birth is required")
		.typeError("Please enter a valid date")
		.test("min-age", "You must be at least 18 years old", function (value) {
			const currentDate = new Date();
			const minAgeDate = new Date(
				currentDate.getFullYear() - 18,
				currentDate.getMonth(),
				currentDate.getDate()
			);
			return value && value <= minAgeDate;
		})
		.test("max-date", "Future dates are not allowed", function (value) {
			const currentDate = new Date();
			return value && value <= currentDate;
		}),

	qualification: Yup.string().required("Qualification is required"),

	profileImage: Yup.mixed()
		.test("fileType", "Only image files are allowed", (value) => {
			return value && value[0] && value[0].type.startsWith("image/");
		})
		.test("fileSize", "File is too large, max size is 20MB", (value) => {
			return value && value[0] && value[0].size <= 5 * 1024 * 1024;
		}),
	profession: Yup.array().required("Please select your profession"),
});

const userAdditionInfoValidation = Yup.object().shape({
	skills: Yup.array().required("Atleast one skill is required"),
	educationInstitute: Yup.string().required(
		"Please select your education institution"
	),
	educationType: Yup.string().required("Please select your education type"),
	preferredJobLocation: Yup.array().required("Please select your location"),
	preferredJobType: Yup.string().required("Please select your job type"),
	portfolio: Yup.string(),
	linkedin: Yup.string().required("Please Enter your linkedin url"),
	github: Yup.string(),
	behance: Yup.string(),
});

const jobValidation = Yup.object().shape({
	jobTitle: Yup.string().required("Please Enter your job title"),
	companyName: Yup.string().required("Please Enter your company name"),
	location: Yup.string().required("Please Enter your job location"),
	workExperience: Yup.string().required("Please Enter your work experience"),
	ctc: Yup.number().required("Enter your current CTC"),
	eCtc: Yup.number().required("Enter your expected CTC"),
});

const emplyerInfoValidation = Yup.object().shape({
	profileImage: Yup.mixed()
		.test("fileType", "Only image files are allowed", (value) => {
			return value && value[0] && value[0].type.startsWith("image/");
		})
		.test("fileSize", "File is too large, max size is 20MB", (value) => {
			return value && value[0] && value[0].size <= 5 * 1024 * 1024;
		}),
	companyName: Yup.string().required("Please Enter your company name"),
	companyEmail: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
	companySite: Yup.string().required("Please Enter your company website"),
	companyAddress: Yup.string().required("Please Enter your company address"),
	companyDescription: Yup.string().required(
		"Please Enter your company description"
	),
	companySize: Yup.string().required("Please Select your company size"),
	industryType: Yup.string().required("Please Select your company type"),
	employmentType: Yup.string().required("Please Select your employment type"),
	companyLinkedin: Yup.string().required(
		"Please Enter your company linkedin"
	),
	contactNumber: Yup.string()
		.min(10, "Minimum 10 characters"),
});

// job posting validation
const jobPostValidation = Yup.object().shape({
	jobTitle: Yup.string().required("Please Enter your job title"),
	jobDescription: Yup.string().required("Please Enter job description"),
	industry: Yup.string().required("Please Enter your industry"),
	jobType: Yup.string().required("Please Enter your job type"),
	employmentType: Yup.string().required("Please Enter your employment type"),
	experience: Yup.string().required("Please select your experience"),
	qualification: Yup.string().required("Please select your qualification"),
	candidateGender: Yup.string(),
	jobLocation: Yup.string().required("Please select your job location"),
	offeredSalary: Yup.number().required("Enter your offered salary"),
	jobPlace: Yup.string().required("Please select your job place"),
	deadline: Yup.date().required("Please select deadline date"),
	skills: Yup.array().required("Please Enter required skill"),
});

export {
	signupValidations,
	loginValidations,
	userAdditionInfoValidation,
	userInfoValidation,
	jobValidation,
	emplyerInfoValidation,
	jobPostValidation,
};
