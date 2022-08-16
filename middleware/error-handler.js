const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statuscode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, please try later",
  };
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message });
  // }
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statuscode = StatusCodes.BAD_REQUEST;
    // return res.status(customError.statuscode).json(customError.msg);
  }
  if (err.code && err.code === 11000) {
    customError.statuscode = StatusCodes.BAD_REQUEST;
    customError.msg =
      "Email account already exist!, please try another email account";
    // return res.status(customError.statuscode).json(customError.msg);
  }
  if (err.name === "CastError") {
    customError.msg = `No item found with id: ${err.value}`;
    customError.statuscode = StatusCodes.NOT_FOUND;
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.statuscode).json(customError.msg);
};

module.exports = errorHandlerMiddleware;
