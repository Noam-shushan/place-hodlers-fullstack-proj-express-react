import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import { router as usersRouter } from './routes/users.js'
import { router as todosRouter } from './routes/todos.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/todos', todosRouter)


app.get('/', (req, res) => {
    res.send('Home')
})

const port = process.env.SERVER_PORT || 3000
app.listen(port, () => console.log(`Server is running on port ${port}...`))