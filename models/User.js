const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name!."],
    minlenght: 3,
    maxlenght: 50,
  },
  email: {
    type: String,
    required: [true, "please provide an email!."],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please provide valid email!.",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide a password!."],
    minlenght: 6,
  },
});
// password hashing
UserSchema.pre("save", async function () {
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});
// getting the current user name
UserSchema.methods.getName = function () {
  return this.name;
};
// generating json-web-token for current user and returning it back
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWTSECRATETOKEN,
    { expiresIn: process.env.JTW_LIFETIME }
  );
};
// comparing the userpassword
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcryptjs.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
