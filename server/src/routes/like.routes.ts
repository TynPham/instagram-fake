import { Router } from 'express'
import { likeController, unLikeController } from '~/controllers/like.controller'
import { accessTokenValidator } from '~/middlewares/auth.middleware'
import { postIdValidator } from '~/middlewares/bookmark.middleware'
import { wrapHandleRequest } from '~/utils/handler'

const likeRouter = Router()

likeRouter.post('/', accessTokenValidator, postIdValidator, wrapHandleRequest(likeController))
likeRouter.delete('/posts/:post_id', accessTokenValidator, postIdValidator, wrapHandleRequest(unLikeController))

export default likeRouter
