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
		.notRequired()
		.test("fileType", "Only image files are allowed", (value) => {
			if (!value || value.length === 0) return true;
			return value[0]?.type.startsWith("image/");
		})
		.test("fileSize", "File is too large, max size is 20MB", (value) => {
			if (!value || value.length === 0) return true;
			return value[0]?.size <= 5 * 1024 * 1024;
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

const companyValidationSchema = Yup.object().shape({
  name: Yup.string().required("Company name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  website: Yup.string().url("Invalid URL").required("Website is required"),
  industry: Yup.string().required("Industry is required"),
  location: Yup.string().required("Location is required"),
  address: Yup.string().required("Address is required"),
  description: Yup.string().required("Description is required"),
  size: Yup.string().required("Company size is required"),
  workType: Yup.string().required("Please Select your employment type"),
  linkedin: Yup.string()
    .url("Invalid LinkedIn URL")
    .required("LinkedIn is required"),
  companyLogo: Yup.mixed()
    .required("Company logo is required")
    .test("fileType", "Only image files are allowed", (value) => {
      if (!value || value.length === 0) return true;
      return value[0]?.type.startsWith("image/");
    })
    .test("fileSize", "File is too large, max size is 20MB", (value) => {
      if (!value || value.length === 0) return true;
      return value[0]?.size <= 5 * 1024 * 1024;
    }),
});

const emplyerInfoValidation = Yup.object().shape({
	profileImage: Yup.mixed()
		.notRequired()
		.test("fileType", "Only image files are allowed", (value) => {
			if (!value || value.length === 0) return true;
			return value[0]?.type.startsWith("image/");
		})
		.test("fileSize", "File is too large, max size is 20MB", (value) => {
			if (!value || value.length === 0) return true;
			return value[0]?.size <= 5 * 1024 * 1024;
		}),
	companyName: Yup.string().required("Please Enter your company name"),
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
	contactNumber: Yup.string().min(10, "Minimum 10 characters"),
});

// update employer profile
const employerProfileValidation = Yup.object().shape({
	companyLogo: Yup.mixed()
		.notRequired(true),
	companyName: Yup.string().required("Please Enter your company name"),
	companyEmail: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
	companyWebSite: Yup.string().required("Please Enter your company website"),
	companyAddress: Yup.string().required("Please Enter your company address"),
	companyLocation: Yup.string().required("Please Enter your company location"),
	companyDescription: Yup.string().required(
		"Please Enter your company description"
	),
	companySize: Yup.string().required("Please Select your company size"),
	industryType: Yup.string().required("Please Select your company type"),
	employmentType: Yup.string().required("Please Select your employment type")
});

const employerLinkedinValidation = Yup.object().shape({
	companyLinkedin: Yup.string().required(
		"Please Enter your company linkedin"
	),
});

// job posting validation
const jobPostValidation = Yup.object().shape({
	jobTitle: Yup.string().required("Please Enter your job title"),
	jobDescription: Yup.string()
		.required("Please Enter job description")
		.max(10000, 'Description must be at most 10000 characters long'),
	industry: Yup.string().required("Please Enter your industry"),
	jobType: Yup.string().required("Please Enter your job type"),
	employmentType: Yup.string().required("Please Enter your employment type"),
	experience: Yup.string().required("Please select your experience"),
	qualification: Yup.string().required("Please select your qualification"),
	candidateGender: Yup.string(),
	jobLocation: Yup.string().required("Please select your job location"),
	offeredSalary: Yup.string()
		.required("Enter your offered salary")
		.matches(/^\d{1,}(?:[.,]\d{1,3})?\s*-\s*\d{1,}(?:[.,]\d{1,3})?$/, 'Invalid salary range format. Please use format like "12k - 20k" or "12000 - 20000"')
		.test('validRange', 'Invalid salary range', function (value) {
			if (!value) return true; // Allow empty values

			const [min, max] = value.split('-').map(str => {
			const num = Number(str.replace(/[^\d]/g, '')); // Remove non-numeric characters
			return isNaN(num) ? 0 : num; 
			});

			return min <= max; 
		}),
	jobPlace: Yup.string().required("Please select your job place"),
	deadline: Yup.date()
		.required("Please select deadline date")
		.min(new Date(), 'Date cannot be in the past')
  		.max(new Date(new Date().getTime()+30*24*60*60*1000), 'Date must be within the last month'),
	skills: Yup.array().required("Please Enter required skill"),
});

// update employee profile
const profileInfoValidation = Yup.object().shape({
	profileImage: Yup.mixed()
		.notRequired()
		.test("fileType", "Only image files are allowed", (value) => {
			if (!value || value.length === 0) return true;
			return value[0]?.type.startsWith("image/");
		})
		.test("fileSize", "File is too large, max size is 20MB", (value) => {
			if (!value || value.length === 0) return true;
			return value[0]?.size <= 5 * 1024 * 1024;
		}),
	username: Yup.string().required("Name is Required"),
	email: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
	phone: Yup.string()
		.required("Contact Number is required")
		.min(10, "Minimum 10 characters"),
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
	about: Yup.string().required("About is required"),
});

const profileEducationValidation = Yup.object().shape({
	educationInstitute: Yup.string().required(
		"Please select your education institution"
	),
	educationType: Yup.string().required("Please select your education type"),
	qualification: Yup.string().required("Qualification is required"),
});

const profileJobValidation = Yup.object().shape({
	profession: Yup.array().required("Please select your profession"),
	jobTitle: Yup.string(),
	companyName: Yup.string(),
	location: Yup.string(),
	workExperience: Yup.string().required("Please Enter your work experience"),
	ctc: Yup.string(),
	eCtc: Yup.string(),
	skills: Yup.array().required("Atleast one skill is required"),
	preferredJobLocation: Yup.array().required("Please select your location"),
	preferredJobType: Yup.string().required("Please select your job type"),
	resume: Yup.mixed().test("fileType", "Only pdf files are allowed", (value) => {
		if (!value || value.length === 0) return true;
		return value[0]?.type === "application/pdf";
	}),
});

const profileSocialValidation = Yup.object().shape({
	portfolio: Yup.string(),
	linkedin: Yup.string().required("Please Enter your linkedin url"),
	github: Yup.string(),
	behance: Yup.string(),
});

const passwordValidations = Yup.object().shape({
	oldPassword: Yup.string()
		.required("Password is required")
		.min(3, "Minimum 8 characters"),
	newPassword: Yup.string()
		.required("Password is required")
		.min(3, "Minimum 8 characters"),
	confirmPassword: Yup.string()
		.required("Confirm Password is required")
		.oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});

// forgot password validation
const forgotPasswordValidation = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
});

// reset password validation
const resetPasswordValidation = Yup.object().shape({
	otp: Yup.string()
		.required("OTP is required")
		.matches(/^\d{4}$/,"OTP must be exactly 4 digits and only contains numbers"),
	password: Yup.string()
		.required("Password is required")
		.min(3, "Minimum 8 characters"),
	confirmPassword: Yup.string()
		.required("Confirm Password is required")
		.oneOf([Yup.ref("password"), null], "Passwords must match"),
});

// otp validation
const otpVerifyValidation = Yup.object().shape({
	otp: Yup.string()
		.required("OTP is required")
		.matches(/^\d{4}$/,"OTP must be exactly 4 digits and only contains numbers"),
});

export {
	signupValidations,
	loginValidations,
	userAdditionInfoValidation,
	userInfoValidation,
	jobValidation,
	companyValidationSchema,
	emplyerInfoValidation,
	jobPostValidation,
	profileInfoValidation,
	profileEducationValidation,
	profileJobValidation,
	profileSocialValidation,
	passwordValidations,
	employerProfileValidation,
	employerLinkedinValidation,
	forgotPasswordValidation,
	resetPasswordValidation,
	otpVerifyValidation,
};
