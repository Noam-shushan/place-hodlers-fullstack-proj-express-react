import pool from './dbPool.js'

/**
 * Get all users from the database
 * @param {GetOptions} options
 * @returns {Promise<User[]>} all users
 */
export async function getAllUsers({ limit, offset }) {
    const [rows] = await pool.query(`SELECT * FROM users WHERE isDeleted = false LIMIT ? OFFSET ?`, [limit, offset])
    return rows
}

/**
 * Creates a new user in the database
 * @param {User} user 
 * @returns {Promise<number>} id of the new user
 */
export async function createUser(user) {
    const { firstName, lastName, username, email, phone, password } = user
    const [result] = await pool.query(`
    INSERT INTO users (firstName, lastName, username, email, phone, password)
    VALUES (?, ?, ?, ?, ?, ?)`,
        [firstName, lastName, username, email, phone, password])
    return result.insertId
}

/**
 * Get a user by id
 * @param {number} id 
 * @param {Object} options
 * @returns {Promise<User | undefined>} the user with the given id or undefined if not found
 */
export async function getUserById(id) {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ? AND isDeleted = false', [id])
    return rows[0]
}

/**
 * Get a user by username
 * @param {string} username
 * @returns {Promise<User | undefined>} the user with the given username or undefined if not found
*/
export async function getUser(username) {
    const [rows] = await pool.query(`SELECT * FROM users 
    WHERE username = ? AND isDeleted = false`,
        [username])
    return rows[0]
}

/**
 * Update a user by username and new user properties
 * @param {number} id 
 * @param {User} newUser 
 * @returns {Promise<boolean>} true if the user was updated, false if not found
 */
export async function updateUser(username, newProps) {
    const oldUser = await getUser(username)
    if (!oldUser) {
        throw "User not found"
    }

    const { firstName, lastName, email, phone, password } = { ...oldUser, ...newProps }
    console.log('updateUser', firstName, lastName, email, phone, password, username)
    const [result] = await pool.query(`
    UPDATE users 
    SET firstName = ?, lastName = ?, email = ?, phone = ?, password = ?
    WHERE username = ?`,
        [firstName, lastName, email, phone, password, username])
    return result.affectedRows > 0
}

/**
 * Delete a user by username
 * @param {number} id 
 */
export async function deleteUser(username) {
    const oldUser = await getUser(username)
    if (!oldUser) {
        throw "User not found"
    }
    const [result] = await pool.query(`
    UPDATE users 
    SET isDeleted = true
    WHERE username = ?`, [username])
    return result.affectedRows > 0
}
