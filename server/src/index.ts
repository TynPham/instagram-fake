import express from 'express'
import { defaultErrorHandler } from './middlewares/error.middleware'
import database from './services/database.services'
import authRouter from './routes/auth.routes'
import cors from 'cors'
const app = express()
const POST = 4000

app.use(cors())
app.use(express.json())

app.use('/auth', authRouter)

app.use(defaultErrorHandler)

database.connectDB()

app.listen(POST, () => {
  console.log(`Server is running on http://localhost:${POST}`)
})
