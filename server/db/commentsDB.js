import pool from './dbPool.js'

// Create
export async function addComment({postId, username, email, body}){
    const [result] = pool.query(`INSERT INTO comments (postId = ?, username = ?, email = ?, body = ? 
        VALUES(?, ?, ?, ?)`, 
        [postId, username, email, body]
        );
    return result.insertId;
}

// Read
export async function getAllComments({ postId, limit, offset }){
    let result = [];
    if (limit === 0) {
        result = await pool.query(`SELECT * FROM comments WHERE isDeleted = false AND postId = ?`, [postId]);
    }
    else {
        result = await pool.query(`SELECT * FROM comments WHERE isDeleted = false AND postId = ? LIMIT ? OFFSET ?`, [postId, limit, offset]);
    }
    const [rows] = result;
    return rows;
}

export async function getCommentById(postId, commentId){
    const [rows] = await pool.query(`SELECT * FROM comments WHERE isDeleted = false AND postId = ? AND id = ?`, [postId, commentId]);
    return rows[0];
}

// Update
export async function updateComment({ commentId, postId, username, email, body }) {
    if (!await getUser(username)) {
        throw "User not found"
    }

    let comment = await getCommentById(postId, commentId);
    if (email) {
        comment.email = email;
    }
    if (body) {
        comment.body = body;
    }

    const [result] = await pool.query(`
        UPDATE comments 
        SET email = ?, body = ?  WHERE id = ? AND postId = ?`,
        [comment.email, comment.body, commentId, postId]
        );

    return result.affectedRows > 0
}

//Delete
export async function deleteComment({commentId, postId}){
    if (!await getUser(username)) {
        throw "User not found"
    }

    let comment = await getCommentById(postId, commentId);
    comment.isDeleted = true;

    const [result] = await pool.query(`
        UPDATE comments 
        SET isDeleted = ?  WHERE id = ? AND postId = ?`, 
        [comment.isDeleted,commentId, postId]
        );
    return result.affectedRows > 0
}