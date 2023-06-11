import express from 'express'
import { router as usersRouter } from './routes/users.js'

const app = express()

app.use(express.json())
app.use('/api/users', usersRouter)


app.get('/', (req, res) => {
    res.send('Home')
})

app.listen(3000, () => console.log('Server is running on port 3000'))