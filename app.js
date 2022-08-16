require("dotenv").config();
require("express-async-errors");
const express = require("express");
const connectDB = require("./db/connect");
// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
// authentication middleware
const authenticateUser = require("./middleware/authentication");
// extra Security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
// importing routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
// init express app
const app = express();
// init built-middleware for parsing the data and security
app.set("trust proxy", 1);
// 100 requests 15 seconds
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);
// injecting error-middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});
const port = process.env.PORT || 3000;
const start = () => {
  try {
    connectDB(process.env.MONGO_URI).then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }
      console.log("Mongoose Connection successfull.");
    });
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
// starting the server.....
start();
// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  /// closing server for possible rejection
  server.close(() => {
    process.exit(1);
  });
});
