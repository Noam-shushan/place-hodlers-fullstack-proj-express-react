import express from 'express'
import * as postsDB from '../db/postsDB.js'

export const router = express.Router()

// GET
router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const postsList = await postsDB.getAllPosts(userId, req.query);
    console.log(postsList);
    if (postsList.length === 0) {
        res.status(400).send("No posts to show.");
    } else {
        res.send(postsList);
    }
});

router.get('/:userId', async (req, res) => {
    const postId = req.params.userId;
    const post = await postsDB.getPostById(postId);
    if (!post) {
        res.status(404).send('Post not found');
        return
    }
    res.send(post);
})


// POST
router.post('/', async (req, res) => {
    const id = await postsDB.addPost(req.body);
    if (!id) {
        res.status(400).send("Error' please try again.");
        return;
    }else{
        res.status(201).send(id);
    }
})

// PUT
router.put('/:postId', async (req, res) => {
    const postId = req.params.postId;

    const isUpdate = await postsDB.updatePost(postId, req.body);
    if (!isUpdate) {
        res.status(400).send("Error, post has not been updated, please try again.");
        return;
    }
    res.status(204).send(isUpdate);
})

// DELETE
router.delete('/:postId', async (req, res) => {
    const username = req.params.postId
    const isDelete = await postsDB.deletePost(username)
    res.status(204).send(isDelete)
})