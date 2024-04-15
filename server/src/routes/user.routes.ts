import { Router } from 'express'
import { followerController, getMeController } from '~/controllers/user.controller'
import { accessTokenValidator } from '~/middlewares/auth.middleware'
import { followValidator } from '~/middlewares/user.middleware'
import { wrapHandleRequest } from '~/utils/handler'

const userRouter = Router()

userRouter.post('/follow', accessTokenValidator, followValidator, wrapHandleRequest(followerController))
userRouter.get('/me', accessTokenValidator, wrapHandleRequest(getMeController))

export default userRouter
