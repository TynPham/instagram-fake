import { Router } from 'express'
import { followerController } from '~/controllers/user.controller'
import { accessTokenValidator } from '~/middlewares/auth.middleware'
import { followValidator } from '~/middlewares/user.middleware'
import { wrapHandleRequest } from '~/utils/handler'

const userRouter = Router()

userRouter.post('/follow', accessTokenValidator, followValidator, wrapHandleRequest(followerController))

export default userRouter
