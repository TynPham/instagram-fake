import { ParamsDictionary } from 'express-serve-static-core'
import { NextFunction, Request, Response } from 'express'
import { CreatePostBodyReq } from '~/models/requests/post.request'
import { HTTP_STATUS_CODE } from '~/constants/httpStatusCode'
import { POST_MESSAGES } from '~/constants/messages'
import postServices from '~/services/post.services'

export const createPostController = async (
  req: Request<ParamsDictionary, any, CreatePostBodyReq>,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.decoded_authorization?.user_id as string
  const body = req.body

  const result = await postServices.createPost(user_id, body)

  return res.status(HTTP_STATUS_CODE.OK).json({
    message: POST_MESSAGES.CREATE_POST_SUCCESSFULLY,
    result
  })
}
