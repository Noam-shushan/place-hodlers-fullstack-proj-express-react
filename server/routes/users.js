import express from 'express'
import * as db from '../db/usersDB.js'
import * as validation from './validation/usersVal.js'

export const router = express.Router()

router.get('/', async (req, res) => {
    console.log('GET /api/users', req.query)
    const { error, value } = validation.validateQueryOnGetUsers(req.query)
    if (error) {
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return
    }
    const { limit, offset } = value
    const users = await db.getAllUsers({ limit, offset })
    res.send(users)
})

router.get('/:username', async (req, res) => {
    console.log('GET /api/users/:username')
    const username = req.params.username
    const user = await db.getUser(username)
    if (!user) {
        res.status(404).send({ error: 'User not found' })
        return
    }
    res.send(user)
})

router.put('/:username', async (req, res) => {
    console.log('PUT /api/users/update-user/:username', req.body, req.params.username)
    const username = req.params.username

    const { error } = validation.validateUserOnUpdate(req.body)
    if (error) {
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return
    }
    const isUpdate = await db.updateUser(username, req.body)
    res.status(204).send({ isUpdate: isUpdate })
})

router.post('/', async (req, res) => {
    console.log('POST /api/users', req.body)
    const { error } = validation.validateUserOnPost(req.body)
    if (error) {
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return
    }
    const id = await db.createUser(req.body)
    res.status(201).send({ id: id })
})

router.delete('/:username', async (req, res) => {
    console.log('DELETE /api/users/:username', req.params.username)
    const username = req.params.username
    const isDelete = await db.deleteUser(username)
    res.status(204).send({ isDelete: isDelete })
})

