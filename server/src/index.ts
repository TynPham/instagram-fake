import express, { NextFunction, Request, Response } from 'express'
const app = express()
const POST = 4000

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello World')
})

app.listen(POST, () => {
  console.log(`Server is running on http://localhost:${POST}`)
})
