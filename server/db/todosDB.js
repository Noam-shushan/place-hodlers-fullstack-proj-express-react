import pool from './dbPool.js'


export async function getAllTodos() {
    const [rows] = await pool.query('SELECT * FROM todos')
    return rows
}

export async function count(userId) {
    const result = await pool.query('SELECT COUNT(*) FROM todos WHERE userId = ?', [userId])
    return result[0][0]['COUNT(*)']
}