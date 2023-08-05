// CRUD for completed
const pool = require("../Database/db");

const getCleaned = async (request, response, next) => {
    try {
        const { rows } = await pool.query("SELECT * FROM cleaned");
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

const setInvoiced = async (request, response, next) => {
    // ⚠️
    const { record_no } = request.params;
    try {
        const { rows } = await pool.query(
            "UPDATE cleaned SET invoiced = NOT cleaned.invoiced, date_invoiced = NOW() WHERE record_no = $1 RETURNING *",
            [record_no]
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

module.exports = {
    getCleaned,
    setInvoiced,
};
