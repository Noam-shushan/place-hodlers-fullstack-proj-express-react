import pool from './db.js'
import User from './types.js'


/**
 * Get all users from the database
 * @returns {Promise<User[]>} all users
 */
export async function getAllUsers() {
    const [rows] = await pool.query('SELECT * FROM users WHERE isDeleted = false')
    return rows
}

/**
 * Creates a new user in the database
 * @param {User} user 
 * @returns {Promise<number>} id of the new user
 */
export async function createUser(user) {
    const { name, username, email, phone, website } = user
    const [result] = await pool.query(`
    INSERT INTO users (name, username, email, phone)
    VALUES (?, ?, ?, ?)`,
        [name, username, email, phone, website])
    return result.insertId
}

/**
 * Get a user by id
 * @param {number} id 
 * @param {Object} options
 * @returns {Promise<User | undefined>} the user with the given id or undefined if not found
 */
export async function getUser(id) {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ? AND isDeleted = false', [id])
    return rows[0]
}

/**
 * 
 * @param {number} id 
 * @param {User} newUser 
 * @returns {Promise<boolean>} true if the user was updated, false if not found
 */
export async function updateUser(id, newUser) {
    const oldUser = await getUser(id)
    if (!oldUser) {
        return false
    }

    const { name, username, email, phone, website } = { ...newUser, ...oldUser }
    const [result] = await pool.query(`
    UPDATE users
    SET name = ?, username = ?, email = ?, phone = ?, website = ?
    WHERE id = ?`,
        [name, username, email, phone, website, id])
    return result.affectedRows > 0
}

/**
 * Delete a user by id
 * @param {number} id 
 */
export async function deleteUser(id) {
    await updateUser(id, { isDeleted: true })
}
