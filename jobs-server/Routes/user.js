// CRUD for users
// login and oauth
const bcrypt = require("bcrypt");
const uuidv4 = require("uuid").v4;
const pool = require("../Database/db");

const login = async (request, response, next) => {
    const { username, password } = request.body;
    try {
        const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

        if (rows.length > 0) {
            const {
                id: dbId,
                username: dbUsername,
                password: usrPassword,
                memberof: dbMemberof,
                active: dbActive,
            } = rows[0];

            const comparePassword = await bcrypt.compare(password, usrPassword);
            if (comparePassword) {
                request.session.authenticated = true;
                request.session.user = { id: dbId, username: dbUsername, memberof: dbMemberof, active: dbActive };
                response.json({ id: dbId, username: dbUsername });
            } else {
                response.sendStatus(403);
            }
        } else {
            response.sendStatus(404);
        }
    } catch (err) {
        err.status = 418;
        next(err);
    }
};

const createUser = async (request, response, next) => {
    const { username, password, memberof } = request.body;
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const { rows } = await pool.query(
            "INSERT INTO users (id, username, password, memberof) VALUES ($1, $2, $3, $4) RETURNING id, username, memberof",
            [uuidv4(), username, hashedPassword, memberof]
        );
        if (rows.length > 0) {
            const {
                id: dbId,
                username: dbUsername,
                memberof: dbMemberof,
            } = rows[0];
            request.session.authenticated = true;
            request.session.user = { id: dbId, username: dbUsername, memberof: dbMemberof };
            response.status(201).json({ id: dbId, username: dbUsername });
        } else {
            response.sendStatus(400);
        }
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (request, response, next) => {
    const { username } = request.params;
    console.log("To delete");
    response.sendStatus(204);
};

const logout = (request, response, next) => {
    request.session = null;
    response.redirect("/")
}; 

module.exports = {
    createUser,
    login,
    deleteUser,
    logout
};
