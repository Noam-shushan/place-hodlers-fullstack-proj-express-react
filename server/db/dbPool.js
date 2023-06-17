
import { createPool } from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const pool = createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DB,
    password: process.env.MYSQL_PASSWORD,
}).promise()

export default pool;
