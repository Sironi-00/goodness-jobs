// Crud for flats
const pool = require("../Database/db");

const getFlats = async (request, response, next) => {
    try {
        const { rows } = await pool.query('SELECT * FROM flats');
        if (rows.length > 0) {
            response.json(rows);
        } else {
            response.sendStatus(404);
        }
    } catch (err) {
        err.status = 418
        next(err);
    }
}

const getJobsByFlat = async (request, response, next) => {
    const { flat_code } = request.params;
    try {
        const { rows } = await pool.query('SELECT * FROM jobs WHERE flat_code = $1', [flat_code]);
        if (rows.length > 0) {
            response.json(rows);
        } else {
            response.sendStatus(404);
        }
    } catch (err) {
        err.status = 418
        next(err);
    }
};

const searchFlatByAddress = async (request, response, next) => {
    const searchValue = request.query.search;
    if (!searchValue) {
        return next();
    }
    try {
        // Case Sensitive
        const { rows } = await pool.query(`SELECT * FROM flats WHERE address LIKE $1::text`, [ `%${searchValue}%` ]);
        if (rows.length > 0) {
            response.json(rows);
        } else {
            response.sendStatus(404);
        }
    } catch (err) {
        next(err)
    }
}

const createFlat = async (request, response, next) => {
    const { flat_code, address } = request.body;
    try {
        const { rows } = await pool.query('INSERT INTO flats (flat_code, address) VALUES ($1, $2) RETURNING *', [flat_code, address]);
        if (rows.length > 0) {
            response.status(201).json(rows);
        } else {
            response.sendStatus(404);
        }
    } catch (err) {
        err.status = 418
        next(err);
    }
}

const deleteFlat = async (request, response, next) => {
    try {
        const { flat_code } = request.params;
        if (!flat_code) throw Error("Invalid flat_code");

        const { rows } = await pool.query('DELETE FROM flats WHERE flat_code = $1', [flat_code]);
        if (rows) {
            response.sendStatus(204);
        } else {
            response.sendStatus(404);
        }
    } catch (err) {
        err.status = 418
        next(err);
    }
}

module.exports = {
    getFlats,
    getJobsByFlat,
    searchFlatByAddress,
        createFlat,
    deleteFlat,
    
}