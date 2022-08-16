const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const { findOne } = require("../models/Job");

const getAllJobs = async (req, res) => {
  const userId = req.user.userId;
  const jobs = await Job.find({
    createdBy: userId,
  });
  res.status(StatusCodes.OK).json({
    count: jobs.length,
    jobs,
  });
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`No Job found with id:${jobId}`);
  }
  res.status(StatusCodes.OK).json({
    job,
  });
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({
    job,
  });
};
const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === "" || position === "") {
    throw new BadRequestError("Pleasae Provide company name and position!");
  }
 
  const job = await Job.findByIdAndUpdate(
    {
      _id: jobId,
      createdBy: userId,
    },
    req.body,
    {new:true, runValidators: true}
  );
   if (!job) {
     throw new NotFoundError("Job Not found!");
   }

  res.status(StatusCodes.OK).json(job);
};
const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findByIdAndRemove(
    {
      _id: jobId,
      createdBy: userId,
    },
  );
  if (!job) {
    throw new NotFoundError("Job Not found!");
  }

  res.status(StatusCodes.OK).send();
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
