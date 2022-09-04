const ErrorHander = require("../utils/ErrorHander");
const CatchAsyncError = require("../middleware/CatchAsyncError");
const user = require("../models/UserMOdel");

exports.auth = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role : ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
