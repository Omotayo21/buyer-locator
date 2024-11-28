
const AppError = require("../helpers/AppError");

const errorController = (err, req, res, next) => {
  
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";


  res.status(err.statusCode).json({
    status: err.status,
    message: err.message || "Something went wrong!",
  });
};

module.exports = errorController;
