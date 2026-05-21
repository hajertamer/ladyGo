const AppError = require("../utils/appError");

const globalError = (err, req, res, next) => {
  console.error("ERROR 💥:", err);

  // default values
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // ==============================
  // 🔐 JWT Errors
  // ==============================
  if (err.name === "TokenExpiredError") {
    err = new AppError(401, "Token expired, please login again");
  }

  if (err.name === "JsonWebTokenError") {
    err = new AppError(401, "Invalid token, please login again");
  }

  // ==============================
  // 🧱 MongoDB Errors
  // ==============================

  // invalid ObjectId
  if (err.name === "CastError") {
    err = new AppError(
      400,
      `Invalid ID: ${err.value} (must be 24 characters)`
    );
  }

  // duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = Object.values(err.keyValue)[0];

    err = new AppError(
      400,
      `This ${field} already exists: ${value}`
    );
  }

  // validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors)
      .map(e => e.message)
      .join(" , ");

    err = new AppError(400, errors);
  }

  // ==============================
  // 📩 Custom Errors (AppError)
  // ==============================
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }

  // ==============================
  // 💥 Unknown Errors (Production Safe)
  // ==============================
  return res.status(500).json({
    status: "error",
    message: "Something went wrong"
  });
};

module.exports = globalError;