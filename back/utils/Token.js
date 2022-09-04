const sendToken = (user, status, res) => {
  const token = user.getJWTToken();

  //cookies
  const options = {
    expires: new Date(
        Date.now() + process.env.COOKIE_EXP*24*60*60*100),
    httpOnly: true,
  };
  res
    .status(status)
    .cookie("token", token, options)
    .json({ success: true, user, token });
};

module.exports = sendToken;
