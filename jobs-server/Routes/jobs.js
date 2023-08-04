// CRUD for jobs
const pool = require("../Database/db");

const getJobs = async (request, response, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM jobs");
    if (rows.length > 0) {
      response.json(rows);
    } else {
      response.sendStatus(404);
    }
  } catch (err) {
    err.status = 418;
    next(err);
  }
};

const getJobByRecord_no = async (request, response, next) => {
  const { record_no } = request.params;
  try {
    const { rows } = await pool.query("SELECT * FROM jobs WHERE record_no = $1", [record_no]);
    if (rows.length > 0) {
      response.json(rows[0]);
    } else {
      response.sendStatus(404);
    }
  } catch (err) {
    err.status = 418;
    next(err);
  }
};

const createJob = async (request, response, next) => {
  // ⚠️
  const { flat_code, record_no, date_vacant, date_deadline, instructor, details } = request.body;
  try {
    const { rows } = await pool.query("SELECT flat_code FROM flats WHERE flat_code = $1", [flat_code]);
    if (rows.length === 0) {
      const myErr = new Error("Flat does not exist");
      myErr.status = 400;
      next(myErr);
      return;
    }
  } catch (err) {
    next(err);
    return;
  }
  try {
    const { rows } = await pool.query(
      "INSERT INTO jobs (flat_code, record_no, date_vacant, date_deadline, instructor, details, cleaned, processed) VALUES ($1, $2, $3, $4, $5, $6, false, false) RETURNING *",
      [flat_code, record_no, date_vacant, date_deadline, instructor, details]
    );
    if (rows.length > 0) {
      response.status(201).json(rows);
    } else {
      response.sendStatus(404);
    }
  } catch (err) {
    err.status = 418;
    next(err);
  }
};

const updateJob = async (request, response, next) => {
  // ⚠️
  const { record_no } = request.params;
  const { key, value } = request.body;
  const jobsKeys = {
    date_vacant: "date_vacant",
    date_deadline: "date_deadline",
    instructor: "instructor",
    cleaned: "cleaned",
    processed: "processed",
    details: "details",
  };
  if (!jobsKeys[key] || value == undefined || value == null) {
    response.sendStatus(400);
    return;
  }
  try {
    const { rows } = await pool.query(`UPDATE jobs SET ${jobsKeys[key]} = $1 WHERE record_no = $2 RETURNING *`, [
      value,
      record_no,
    ]);
    if (rows.length > 0) {
      response.status(201).json(rows);
    } else {
      response.sendStatus(404);
    }
  } catch (err) {
    err.status = 418;
    next(err);
  }
};

const finishJob = async (request, response, next) => {
  // ⚠️
  const { record_no } = request.params;
  try {
    const { rows } = await pool.query(
      "UPDATE jobs SET cleaned = true WHERE record_no = $1 AND cleaned = false RETURNING *",
      [record_no]
    );
    if (rows.length > 0) {
      response.status(201).json(rows);
    } else {
      // Already Cleaned
      response.sendStatus(404);
    }
  } catch (err) {
    err.status = 418;
    next(err);
  }
};

const deleteJob = async (request, response, next) => {
  // ⚠️
  try {
    const { record_no } = request.params;
    if (!record_no) throw Error("Invalid record no");

    const { rows } = await pool.query("DELETE FROM jobs WHERE record_no = $1", [record_no]);
    if (rows) {
      response.sendStatus(204);
    } else {
      response.sendStatus(404);
    }
  } catch (err) {
    err.status = 418;
    next(err);
  }
};

module.exports = {
  getJobs,
  getJobByRecord_no,
  createJob,
  updateJob,
  finishJob,
  deleteJob,
};
