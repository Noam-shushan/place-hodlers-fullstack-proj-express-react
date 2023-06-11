
import { createPool } from 'mysql2'

const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'proj6_FS',
    password: 'n1o2a3m4',
}).promise()

console.log(`MYSQL_HOST sd: ${process.env.MYSQL_HOST}`)

export default pool;
