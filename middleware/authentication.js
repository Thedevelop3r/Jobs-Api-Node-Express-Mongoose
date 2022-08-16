const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  //checking header
  const authHeader = req.headers.authorization;
  // validation fail
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication Invalid!");
  }
  // validation passed | token verification
  const token = authHeader.split(" ")[1];
  // verification
  try {
    const paylaod = jwt.verify(token, process.env.JWTSECRATETOKEN);
    const user = User.findById(paylaod.id).select("-password");
    // on success - setting up user data
    req.user = user;
    req.user = { userId: paylaod.userId, name: paylaod.name };
    // sending user to another middleware - success
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid!");
  }
};

module.exports = auth;
