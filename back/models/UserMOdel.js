const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "enter the name"],
  },
  email: {
    type: String,
    required: [true, "enter the email"],
    unique: true,
    validate: [validator.isEmail, "enter a vallid email"],
  },
  pass: {
    type: String,
    required: [true, "enter ur pass"],
    minLength: [8, "password should be 8 charchters "],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  resetpassToken: String,
  resetpassExp: Date,
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("pass")) {
    next();
  }
  this.pass = await bcrypt.hash(this.pass, 10);
});

//jWT token
UserSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SEC, {
    expiresIn: process.env.EXP,
  });
};
//compare pass
UserSchema.methods.comparePass = async function (pass) {
  return await bcrypt.compare(pass, this.pass);
};

//generating new pass
UserSchema.methods.resetPass = function () {
  const resetTok = crypto.randomBytes(20).toString("hax");
  //hashig
  this.resetpassToken = crypto
    .createHash("sha256")
    .update(resetTok)
    .digest("hex");
  this.resetpassExp = Date.now() + 15 * 60 * 1000;
  return resetTok;
};


module.exports = mongoose.model("User", UserSchema);
