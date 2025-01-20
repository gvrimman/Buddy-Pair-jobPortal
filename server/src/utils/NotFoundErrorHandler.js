const ApiResponse = require("./apiResponse");

const NotFoundErrorHandler = (req, res) => {
    res.json(new ApiResponse(404, null, "Resource not found"));
};

module.exports = NotFoundErrorHandler;
