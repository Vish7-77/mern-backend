const ErrorHander = require("../utils/ErrorHander");
const CatchAsyncError = require("../middleware/CatchAsyncError");
const User = require("../models/UserMOdel");
const sendToken = require("../utils/Token");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto-js");
///register user
exports.RegUser = CatchAsyncError(async (req, res, next) => {
  const { name, email, pass } = req.body;

  const user = await User.create({
    name,
    email,
    pass,
  });

  sendToken(user, 201, res);
});

//login

exports.loginUser = CatchAsyncError(async (req, res, next) => {
  const { email, pass } = req.body;
  //cheking if user given pass and email
  if (!email || !pass) {
    return next(new ErrorHander("entre email and pass", 400));
  }
  const user = await User.findOne({ email }).select("+pass");
  if (!user) {
    return next(new ErrorHander("invalid ", 401));
  }
  const isPassMatched = user.comparePass(pass);

  if (!isPassMatched) {
    return next(new ErrorHander("invalid ", 401));
  }
  sendToken(user, 200, res);
});

//logout

exports.logOut = CatchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "logged out",
  });
});

//forgot  pass

exports.forgotPass = CatchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHander("user not found", 404));
  }


  //get resetpas

  const resetToken = user.resetPass();
  await user.save({ validateBeforeSave: false });

  const resetPassUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/pass/reset/${resetToken}`;

  const message = `your reset pass link is :- \n\n ${resetPassUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: ` ecommerce`,
      message,
    });
    res.status(200).json({
      success: true,
      messafe: ` email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetpassToken = undefined;
    user.resetpassExp = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHander(err.message, 500));
  }
});

//Reset password

exports.ResetPASS=CatchAsyncError(async(req,res,next)=>{
  //careting hash token
    const resetpassToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user =await User.findOne({
        resetpassToken,
        resetpassExp:{$gt:Date.now()},

    });
    if (!user) {
        return next(new ErrorHander(" reset pass toke is invalid or has been expired", 404));
      }
      user.pass=req.body.pass;
      user.resetpassToken = undefined;
      user.resetpassExp = undefined;

    await  user.save()


sendToken(user,200,res)

})


//get user datails


exports.getUserDetails=CatchAsyncError(async(req,res,next)=>{
  const user =await User.findId(req.user.id)

 res.status(200).json({
  success:true,
  user
 })
})







