import express, { NextFunction, Request, Response } from 'express'
import { defaultErrorHandler } from './middlewares/error.middleware'
import database from './services/database.services'
import userRouter from './routes/user.routes'
const app = express()
const POST = 4000

app.use(express.json())

app.use('/users', userRouter)

app.use(defaultErrorHandler)

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello World')
})
database.connectDB()

app.listen(POST, () => {
  console.log(`Server is running on http://localhost:${POST}`)
})
