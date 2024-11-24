import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } from '../config.js';
import mysql from 'mysql2';


const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
});

export default pool.promise();

