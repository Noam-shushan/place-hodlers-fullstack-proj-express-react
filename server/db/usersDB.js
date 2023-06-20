import pool from './dbPool.js'

/**
 * Get all users from the database
 * @param {GetOptions} options
 * @returns {Promise<User[]>} all users
 */
export async function getAllUsers({ limit, offset }) {
    let result = [];
    if (limit === 0) {
        result = await pool.query(`SELECT * FROM users WHERE isDeleted = false`)
    }
    else {
        result = await pool.query(`SELECT * FROM users WHERE isDeleted = false LIMIT ? OFFSET ?`, [limit, offset])
    }
    const [rows] = result;
    return rows;
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

export async function count(userId, tableName) {
    const result = await pool.query(`SELECT COUNT(*) FROM ${tableName} WHERE userId = ?`, [userId])
    return result[0][0]['COUNT(*)']
}

export async function getFullUser(username) {
    const user = await getUser(username)
    if (!user) {
        return null
    }
    const address = await getAddress(user.id)
    const company = await getCompany(user.id)

    return { ...user, address, company }
}

export async function getAddress(userId) {
    const [rows] = await pool.query(`SELECT * FROM address WHERE userId = ?`, [userId])
    return rows[0]
}

export async function getCompany(userId) {
    const [rows] = await pool.query(`SELECT * FROM company WHERE userId = ?`, [userId])
    return rows[0]
}



