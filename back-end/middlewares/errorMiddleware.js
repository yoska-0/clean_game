const errorOnProd = (err, res) => {
  res.status(err.statusCode).json({
    success: false,
    message: err.message || "حدث خطأ ما",
  });
};

const errorOnDev = (err, res) => {
  res.status(err.statusCode).json({
    success: false,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === "production") {
    errorOnProd(err, res);
  } else {
    errorOnDev(err, res);
  }
};

export default errorMiddleware;
