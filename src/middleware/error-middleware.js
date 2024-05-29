const errorMiddleware = (err, req, res, next) => {
  let error = err;
  error.statusCode = err.statusCode || 500;
  error.message = err.message;
  return res.status(error.statusCode).json({
    success: false,
    error: {
      message: error.message,
      status: error.statusCode,
      stack: error.stack,
    },
  });
};

module.exports = errorMiddleware;
