const getAllJobs = async (req, res) => {
  res.send("get all jobs");
};

const getJob = async (req, res) => {
  res.send("get a job");
};
const createJob = async (req, res) => {
  res.send("create a new job");
};
const updateJob = async (req, res) => {
  res.send("update an existing job");
};
const deleteJob = async (req, res) => {
  res.send("delete a job");
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
