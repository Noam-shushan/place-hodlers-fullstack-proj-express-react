import pool from './dbPool.js'


export async function getAllTodos() {
    const [rows] = await pool.query('SELECT * FROM todos')
    return rows
}


export async function getTodosByUserId(userId) {
    const [rows] = await pool.query('SELECT * FROM todos WHERE userId = ?', [userId])
    return rows
}

export async function getTodoById(id) {
    const [rows] = await pool.query('SELECT * FROM todos WHERE id = ?', [id])
    return rows[0]
}

export async function addTodo({ userId, title, completed }) {
    const [result] = await pool.query(`INSERT INTO todos (userId, title, completed) VALUES (?, ?, ?)`, [userId, title, completed])
    return result.insertId
}

export async function deleteTodoById(id) {
    const todo = await getTodoById(id)
    if (!todo) {
        return false
    }
    todo.isDeleted = true
    await updateTodoById(id, todo)
    return true
}

export async function updateTodoById(id, newProps) {
    const oldTodo = await getTodoById(id)
    if (!oldTodo) {
        return false
    }
    const { userId, title, completed } = { ...oldTodo, ...newProps }
    const [result] = await pool.query(`UPDATE todos SET userId = ?, title = ?, completed = ? WHERE id = ?`,
        [userId, title, completed, id])
    return result.affectedRows > 0
}