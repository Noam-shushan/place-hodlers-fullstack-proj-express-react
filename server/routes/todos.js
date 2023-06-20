import express from 'express'
import * as db from '../db/todosDB.js'
import * as validation from './validation/todosVal.js'

export const router = express.Router()

router.get('/', async (req, res) => {
    const todos = await db.getAllTodos()
    res.send(todos)
})

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId
    const todos = await db.getTodosByUserId(userId)
    res.send(todos)
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const todo = await db.getTodoById(id)
    if (!todo) {
        res.status(404).send({ error: 'Todo not found' })
        return
    }
    res.send(todo)
})


router.post('/', async (req, res) => {
    const { error, value } = validation.validateTodoOnCreate(req.body)
    if (error) {
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return
    }
    const id = await db.addTodo(value)
    res.send({ id })
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const success = await db.deleteTodoById(id)
    if (!success) {
        res.status(404).send({ error: 'Todo not found' })
        return
    }
    res.send({ success })
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    console.log('PUT /api/todos/update-todo/:id', req.body, id)
    const { error, value } = validation.validateOnUpdate(req.body)
    if (error) {
        res.status(400).send(error.details.map(detail => detail.message).join('\n'))
        return
    }
    const success = await db.updateTodoById(id, value)
    if (!success) {
        res.status(404).send({ error: 'Todo not found' })
        return
    }
    res.send({ success })
})
