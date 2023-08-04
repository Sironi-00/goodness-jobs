const { Pool }  = require("pg");

const connectionString = `postgresql://${process.env.pgUSER}:${process.env.pgPASSWORD}@${process.env.pgHOST}:${process.env.pgPORT}/${process.env.pgDATABASE}`;
const pool = new Pool({
    connectionString
})

module.exports = pool;