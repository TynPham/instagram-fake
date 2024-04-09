import { NextFunction, Request, Response } from 'express'
import { HTTP_STATUS_CODE } from '~/constants/httpStatusCode'
import { ParamsDictionary } from 'express-serve-static-core'
import { LoginReqBody, RegisterReqBody } from '~/models/requests/user.request'
import userServices from '~/services/user.services'
import { USER_MESSAGES } from '~/constants/messages'

export const loginController = async (
  req: Request<ParamsDictionary, any, LoginReqBody>,
  res: Response,
  next: NextFunction
) => {
  const body = req.body
  const result = await userServices.login(body)
  return res.status(HTTP_STATUS_CODE.OK).json({
    result,
    message: USER_MESSAGES.LOGIN_SUCCESSFULLY
  })
}
export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const body = req.body
  const result = await userServices.register(body)
  return res.status(HTTP_STATUS_CODE.OK).json({
    result,
    message: USER_MESSAGES.REGISTER_SUCCESSFULLY
  })
}
