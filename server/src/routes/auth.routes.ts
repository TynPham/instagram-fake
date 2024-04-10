import { Router } from 'express'
import { loginController, registerController } from '~/controllers/auth.controller'
import { loginValidator, registerValidator } from '~/middlewares/auth.middleware'
import { wrapHandleRequest } from '~/utils/handler'

const authRouter = Router()

authRouter.post('/login', loginValidator, wrapHandleRequest(loginController))
authRouter.post('/register', registerValidator, wrapHandleRequest(registerController))

export default authRouter
