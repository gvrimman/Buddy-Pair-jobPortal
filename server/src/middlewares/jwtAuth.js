const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler.js");
const ApiError = require("../utils/apiError.js");
const User = require("../models/user");

const verifyJwt = asyncHandler(async (req, res, next) => {
	const accessToken = req.cookies.accessToken;
	if (!accessToken) {
		throw new ApiError(401, "Failed to obtain AccessToken");
	}
	console.log("Auth Token: ", accessToken);
	try {
		console.log("Token Secret: ", process.env.ACCESS_TOKEN_SECRET_KEY);
		const decodedToken = jwt.verify(
			accessToken,
			process.env.ACCESS_TOKEN_SECRET_KEY
		);
		console.log("decodedToken: ", decodedToken);

		const user = await User.findById(decodedToken._id).select(
			"-password -refreshToken"
		);
		if (!user) {
			throw new ApiError(
				401,
				"User not found with the id we got from decoding the accessToken"
			);
		}
		console.log("Auth User: ", user.username);

		req.user = user;
		next();
	} catch (error) {
		console.log("Auth error: ", error);
		throw new ApiError(401, "AccessToken expired", error);
	}
});

/**
 * @deprecated The method should not be used
 * @use protect routes by role middleware
 */
const authorize = (...roles) => {
	return async (req, res, next) => {
		const user = await User.findById(req.user._id).populate(
			"apps.jobPortal"
		);
		if (!roles.includes(user?.apps?.jobPortal?.role)) {
			throw new ApiError(401, "Unauthorized access");
		}
		next();
	};
};

module.exports = {
	verifyJwt,
	authorize,
};
