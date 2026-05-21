const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.myProfile = catchAsync(async (req, res, next) => {

  if (!req.user) {
    return next(new AppError(404, "User not found"));
  }

  res.status(200).json({
    status: "success",
    data: {
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }
  });

});