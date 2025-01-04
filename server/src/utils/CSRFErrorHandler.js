const CSRFErrorHandler = (err, req, res, next) => {
    if (err.code === "EBADCSRFTOKEN") {
      res.status(403).json({ success: false, message: "Invalid CSRF token" });
    } else {
      next(err);
    }
};

module.exports = CSRFErrorHandler;