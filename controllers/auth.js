const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register user with hashed password | create json-web-token for future athentication
// sending token to browser for front-end auths-access
const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.getName(),
    },
    token,
  });
};

// login user with authentication
const login = async (req, res) => {
  // data validation
  const { email, password } = req.body;
  if (!email || !password) {
    // email of password emtpy ? then => sending BadRequest as a response
    throw new BadRequestError("Please provide email-password!");
  }
  // user exists/not exist validation
  const user = await User.findOne({ email });
  // if user doesnt exist validation
  if (!user) {
    // user not found =>
    // throw UnAthenticated error
    throw new UnauthenticatedError("Invalid Credentials!");
  }
  // password validation
  const isPasswordCorrect = await user.comparePassword(password);
  // if validation failed
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials!");
  }

  // if user exists we create token and send it back to user with user data
  const token = await user.createJWT();

  res.status(StatusCodes.OK).json({
    token,
    user: user.name,
  });
};

//

module.exports = { register, login };
