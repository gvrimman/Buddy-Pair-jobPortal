// define a hoc fn - asyncHandler
const asyncHandler = (requestHandler) => async (req, res, next) => {
	try {
        // await requestHandler fn, pausing execution until it finishes
		await requestHandler(req, res, next);
	} catch (error) {
		console.log(error, "Error");
        // send error res with status code and json object
		res.status(error.statusCode || 500).json({
			succcess: false,
			message: error.message,
			errors: error.errors || [],
		});
	}
};

module.exports = asyncHandler;
