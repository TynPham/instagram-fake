import { Router } from 'express'
import { bookmarkController, unBookmarkController } from '~/controllers/bookmark.controller'
import { accessTokenValidator } from '~/middlewares/auth.middleware'
import { postIdValidator } from '~/middlewares/bookmark.middleware'
import { wrapHandleRequest } from '~/utils/handler'

const bookmarkRouter = Router()

bookmarkRouter.post('/', accessTokenValidator, postIdValidator, wrapHandleRequest(bookmarkController))
bookmarkRouter.delete('/posts/:post_id', accessTokenValidator, postIdValidator, wrapHandleRequest(unBookmarkController))

export default bookmarkRouter
