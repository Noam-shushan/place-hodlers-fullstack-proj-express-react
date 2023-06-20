import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { router as usersRouter } from './routes/users.js'
import {router as postsRouter} from "./routes/posts.js"
import {router as commentsRouter} from "./routes/comments.js"

const app = express()

app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/posts', postsRouter )
app.use('/api/comments', commentsRouter )


app.get('/', (req, res) => {
    res.send('Home')
})

const port = process.env.SERVER_PORT || 3000
app.listen(port, () => console.log(`Server is running on port ${port}...`))