import pool from './dbPool.js'

// Create
export async function addPost(body) {
    const [result] = pool.query("INSERT INTO posts (userId, title, body) VALUES (?, ?, ?)", [body.userId, body.title, body.body]);
    return result.insertId
}

// Read
export async function getAllPosts({ limit, offset }) {
    let result = [];
    if (limit === 0) {
        result = await pool.query(`SELECT * FROM posts WHERE isDeleted = false`)
    }
    else {
        result = await pool.query(`SELECT * FROM posts WHERE isDeleted = false LIMIT ? OFFSET ?`, [limit, offset])
    }
    const [rows] = result;
    return rows;
}

export async function getPostById(id) {
    const [rows] = await pool.query('SELECT * FROM posts WHERE id = ? AND isDeleted = false', [id])
    return rows[0]
}



// Update
export async function updatePost({ postId, title, body, userId }) {
    if (!await getUserById(userId)) {
        throw "User not found"
    }

    let post = await getPostById(postId);
    if (title) {
        post.title = title;
    }
    if (body) {
        post.body = body;
    }

    const [result] = await pool.query(`UPDATE posts SET title = ?, body = ?  WHERE id = ?`, [post.title, post.body, postId])
    return result.affectedRows > 0
}

// Delete
export async function deletePost({postId}){
    if (!await getUserById(userId)) {
        throw "User not found"
    }

    let post = await getPostById(postId);
    post.isDeleted = true;

    const [result] = await pool.query(`UPDATE posts SET isDeleted = ?  WHERE id = ?`, [post.isDeleted, postId])
    return result.affectedRows > 0
}