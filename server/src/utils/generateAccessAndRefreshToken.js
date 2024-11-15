const User = require("../models/user");
const ApiError = require("./apiError");

const generateAccessAndRefreshToken = async (userId) => {
	try {
		const user = await User.findById(userId);

		const accessToken = user.generateAccessToken();
		const refreshToken = user.generateRefreshToken();

		user.refreshToken = refreshToken;
		await user.save({ validateBeforeSave: false });

		return { accessToken, refreshToken };
	} catch (error) {
		throw new ApiError(
			500,
			"Error while generating access token or refresh token"
		);
	}
};

module.exports = generateAccessAndRefreshToken;
