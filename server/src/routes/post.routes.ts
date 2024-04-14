import { Router } from 'express'
import { createPostController } from '~/controllers/post.controller'
import { accessTokenValidator } from '~/middlewares/auth.middleware'
import { createPostValidator } from '~/middlewares/post.middlware'
import { wrapHandleRequest } from '~/utils/handler'

const postRouter = Router()

postRouter.post('/', accessTokenValidator, createPostValidator, wrapHandleRequest(createPostController))

export default postRouter
