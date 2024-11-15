const User = require("../../models/user");
const ApiError = require("../../utils/apiError");
const ApiResponse = require("../../utils/apiResponse");
const asyncHandler = require("../../utils/asyncHandler");
const generateAccessAndRefreshToken = require("../../utils/generateAccessAndRefreshToken");


const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if ([email, password].some((field) => !field || field.trim() === "")) {
		throw new ApiError(400, "All Fields are necessary");
	}

	const isUser = await User.findOne({ email });

	if (!isUser) {
		throw new ApiError(400, "No matching user found");
	}

	const isUserValid = await isUser.isPasswordCorrect(password);
	if (!isUserValid) {
		throw new ApiError(400, "Wrong Password/Email");
	}
	const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
		isUser._id
	);

	isUser.refreshToken = refreshToken;
	await isUser.save();

	const loggedInUser = await User.findById(isUser._id).select(
		"-password -refreshToken"
	);
	const options = {
		httpOnly: true,
		secure: true,
		maxAge: 7 * 24 * 60 * 60 * 1000,
	};

	res.cookie("accessToken", accessToken, options)
		.cookie("refreshToken", refreshToken, options)
		.json(new ApiResponse(200, loggedInUser, "Login Successful"));
});


module.exports = {
    login,
};