import pg from 'pg';
import "dotenv/config"

const pool = new pg.Pool({
    host: process.env.DB_HOST,
    port: process.env.POSTGRESDB_DOCKER_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

export default pool