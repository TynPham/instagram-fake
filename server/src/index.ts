import express from 'express'
import { defaultErrorHandler } from './middlewares/error.middleware'
import database from './services/database.services'
import authRouter from './routes/auth.routes'
import cors from 'cors'
import userRouter from './routes/user.routes'
import postRouter from './routes/post.routes'
import mediaRouter from './routes/media.routes'
import { initFolder } from './utils/files'
import { UPLOAD_IMAGE_TEMP_DIR } from './constants/dir'
import bookmarkRouter from './routes/bookmark.routes'
import likeRouter from './routes/like.routes'
// import './utils/fake'

const app = express()
const POST = 4000
initFolder(UPLOAD_IMAGE_TEMP_DIR)

app.use(cors())
app.use(express.json())

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/medias', mediaRouter)
app.use('/bookmarks', bookmarkRouter)
app.use('/likes', likeRouter)

app.use(defaultErrorHandler)

database.connectDB()

app.listen(POST, () => {
  console.log(`Server is running on http://localhost:${POST}`)
})
