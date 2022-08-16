const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = jwt.sign(
    { userId: user._id, name: user.name },
    "JahazLudanPeyGya",
    { expiresIn: "30d" }
  );
  res.status(StatusCodes.CREATED).json({
    token,
  });
};

const login = async (req, res) => {
  res.send("login User");
};

module.exports = { register, login };
