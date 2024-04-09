import { Router } from 'express'
import { loginController, registerController } from '~/controllers/user.controller'
import { loginValidator, registerValidator } from '~/middlewares/user.middleware'
import { wrapHandleRequest } from '~/utils/handler'

const userRouter = Router()

userRouter.post('/login', loginValidator, wrapHandleRequest(loginController))
userRouter.post('/register', registerValidator, wrapHandleRequest(registerController))

export default userRouter
