const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("name/email/password must be provided!");
  }
  const user = await User.create({ name, email, password });

  res.status(StatusCodes.CREATED).json({
    user,
  });
};

const login = async (req, res) => {
  res.send("login User");
};

module.exports = { register, login };
