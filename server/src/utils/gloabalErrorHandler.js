const ApiError = require("./apiError");

const gloabalErrorHandler = (err, req, res, next) => {
	console.error("Unhandled Error", err);

	let statusCode = 500;
	let message = "Internal Server Error";
	let errors = [];

	if (err instanceof ApiError) {
		statusCode = err.statusCode;
		message = err.message;
		errors = err.errors;
	} else if (err.name === "ValidationError") {
		statusCode = 400;
		message = "Validation Error";
		errors = Object.values(err.errors).map((error) => error.message);
	} else if (err.name === "CastError") {
		statusCode = 400;
		message = "Invalid Id";
	}

	res.status(statusCode).json({
		success: false,
		message,
		errors,
		...(process.env.NODE_ENV === "development" && { stack: err.stack }),
	});
};

module.exports = gloabalErrorHandler;
