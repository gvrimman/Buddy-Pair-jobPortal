const ApiError = require("./apiError");

const gloabalErrorHandler = (err, req, res, next) => {
	if (!err) {
		return next();
	}
	console.log("[ERROR]: Error on path:", req._parsedUrl.pathname);
  	console.log("[gloabalErrorHandler][Runtime Error]: ", err);

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
		gerror: true,
	});
};

module.exports = gloabalErrorHandler;
