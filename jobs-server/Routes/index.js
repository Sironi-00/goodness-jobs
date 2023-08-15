const express = require("express");

const mainRouter = express.Router();

const handleError = (err, req, res, next) => {
    res.status(err.status || 400).json(err.message);
}

const { isAuthenticated, checkRole } = require("../utils/auth");

// Users
const { createUser, deleteUser, login, logout } = require("./user")
mainRouter.post("/user", login);
mainRouter.post("/user/new", createUser);
mainRouter.delete("/user/:username", deleteUser);
mainRouter.get("/user/logout", logout)


// Flats
const { getFlats, getJobsByFlat, searchFlatByAddress, createFlat, deleteFlat, } = require("./flats");
mainRouter.get("/flats", searchFlatByAddress); // Search if no query next();
mainRouter.get("/flats", getFlats); // All flats
mainRouter.get("/flats/:flat_code", getJobsByFlat); // All jobs for flat
mainRouter.post("/flats", createFlat); // new Flat
mainRouter.delete("/flats/:flat_code", deleteFlat); // rm flat

// Jobs
const { getJobs, createJob, updateJob, finishJob, deleteJob, getJobByRecord_no, } = require("./jobs");
mainRouter.get("/jobs", getJobs);
mainRouter.get("/jobs/:record_no", getJobByRecord_no);
// ⚠️
mainRouter.post("/jobs", createJob);
mainRouter.patch("/jobs/:record_no/done", finishJob);
mainRouter.patch("/jobs/:record_no", updateJob);
mainRouter.delete("/jobs/:record_no", deleteJob);


const { getCleaned, setInvoiced } = require("./cleaned");
mainRouter.get("/completed", getCleaned);
mainRouter.patch("/completed/:record_no/invoiced", setInvoiced);


mainRouter.use(handleError);

module.exports = mainRouter;