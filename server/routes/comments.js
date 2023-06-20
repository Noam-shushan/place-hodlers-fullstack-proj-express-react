import express from 'express'
import * as commentsDB from '../db/commentsDB.js'

export const router = express.Router()

//GET
router.get('/', async (req, res) => {
    const todosList = await commentsDB.getAllComments(req.query);
    if (todosList.length === 0) {
        res.status(400).send("No posts to show.");
    } else {
        res.send(todosList);
    }
});

router.get('/:userId', async (req, res) => {
    const commentId = req.params.id;
    const comment = await commentsDB.getCommentById(commentId);
    if (!comment) {
        res.status(404).send('Post not found');
        return
    }
    res.send(comment);
})

//POST
router.post('/:postId', async (req, res) => {
    const id = await commentsDB.addComment(req.body);
    if (!id) {
        res.status(400).send("Error' please try again.");
        return;
    }else{
        res.status(201).send(id);
    }
})

//PUT
router.put('/:postId', async (req, res) => {
    const postId = req.params.postId;

    const isUpdate = await commentsDB.updateComment(postId, req.body);
    if (!isUpdate) {
        res.status(400).send("Error, post has not been updated, please try again.");
        return;
    }
    res.status(204).send(isUpdate);
})

//DELETE
router.delete('/:postId', async (req, res) => {
    const postId = req.params.postId
    const isDelete = await commentsDB.deleteComment(postId, req.query)
    res.status(204).send(isDelete)
})