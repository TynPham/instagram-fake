import { Router } from 'express'
import { followerController, getMeController, getSuggestsController } from '~/controllers/user.controller'
import { accessTokenValidator } from '~/middlewares/auth.middleware'
import { followValidator } from '~/middlewares/user.middleware'
import { wrapHandleRequest } from '~/utils/handler'

const userRouter = Router()

userRouter.post('/follow', accessTokenValidator, followValidator, wrapHandleRequest(followerController))
userRouter.get('/me', accessTokenValidator, wrapHandleRequest(getMeController))
userRouter.get('/suggests', accessTokenValidator, wrapHandleRequest(getSuggestsController))

export default userRouter
