import express from 'express'
import * as db from '../db/usersDB.js'

export const router = express.Router()

router.get('/', async (req, res) => {
    let users = await db.getAllUsers()
    res.send(users)
})

router.get('/:id', async (req, res) => {
    console.log('GET /api/users/:id')
    const id = req.params.id
    const userId = await usersDb.getUser(id)
    res.send(userId)
})

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        website: Joi.string().required()
    })
    return schema.validate(user)
}

router.put('/update/:id', async (req, res) => {
    console.log('PUT /api/users/update-user/:id', req.body, req.params.id)
    const id = req.params.id

    const { error } = validateUser(req.body)
    if (error) {
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return
    }
    const isUpdate = await usersDb.updateUser(id, req.body)
    res.status(204).send({ isUpdate: isUpdate })
})

