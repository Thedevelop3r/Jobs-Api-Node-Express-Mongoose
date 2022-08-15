const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const bcryptjs = require("bcryptjs");

const register = async (req, res) => {
//   const { name, email, password } = req.body;
//   if (!name || !email || !password) {
//     throw new BadRequestError("name/email/password must be provided!");
//   }

  const user = await User.create({...req.body});

  res.status(StatusCodes.CREATED).json({
    user,
  });
};

const login = async (req, res) => {
  res.send("login User");
};

module.exports = { register, login };





// const salt = await bcryptjs.genSalt(10);
// const hashedPassword = await bcryptjs.hash(password, salt);
//   const hashedPassword = await bcryptjs.hash(
//     password,
//     await bcryptjs.genSalt(10)
//   );
// const tempUser = { name, email, password: hashedPassword };