const ApiResponse = require("./apiResponse");

const NotFoundErrorHandler = (req, res) => {
    res.status(404).json(new ApiResponse(404, null, "Resource not found"));
};

module.exports = NotFoundErrorHandler;
