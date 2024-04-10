import { NextFunction, Request, Response } from 'express'
import { HTTP_STATUS_CODE } from '~/constants/httpStatusCode'
import { ParamsDictionary } from 'express-serve-static-core'
import { LoginReqBody, RegisterReqBody } from '~/models/requests/auth.request'
import { USER_MESSAGES } from '~/constants/messages'
import authServices from '~/services/auth.services'
import { User } from '~/models/schemas/User.schema'

export const loginController = async (
  req: Request<ParamsDictionary, any, LoginReqBody>,
  res: Response,
  next: NextFunction
) => {
  const user_id = (req.user as User)._id?.toString()
  const result = await authServices.login(user_id as string)
  return res.status(HTTP_STATUS_CODE.OK).json({
    message: USER_MESSAGES.LOGIN_SUCCESSFULLY,
    result
  })
}
export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const body = req.body
  const result = await authServices.register(body)
  return res.status(HTTP_STATUS_CODE.OK).json({
    message: USER_MESSAGES.REGISTER_SUCCESSFULLY,
    result
  })
}
