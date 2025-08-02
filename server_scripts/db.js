const pg = require("pg");

const pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'aaa',
    database: 'postgres'
});

module.exports = pool