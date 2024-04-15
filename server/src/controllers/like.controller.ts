import { ParamsDictionary } from 'express-serve-static-core'
import { NextFunction, Request, Response } from 'express'
import { HTTP_STATUS_CODE } from '~/constants/httpStatusCode'
import { BOOKMARK_MESSAGES, LIKE_MESSAGES } from '~/constants/messages'
import { LikeReqBody, UnLikeReqParams } from '~/models/requests/like.request'
import likeServices from '~/services/like.services'

export const likeController = async (
  req: Request<ParamsDictionary, any, LikeReqBody>,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.decoded_authorization?.user_id as string
  const post_id = req.body.post_id

  const result = await likeServices.like(user_id, post_id)

  return res.status(HTTP_STATUS_CODE.OK).json({
    message: LIKE_MESSAGES.LIKE_SUCCESSFULLY,
    result
  })
}

export const unLikeController = async (req: Request<UnLikeReqParams>, res: Response, next: NextFunction) => {
  const user_id = req.decoded_authorization?.user_id as string
  const post_id = req.params.post_id

  const result = await likeServices.unLike(user_id, post_id)

  return res.status(HTTP_STATUS_CODE.OK).json({
    message: LIKE_MESSAGES.UNLIKE_SUCCESSFULLY,
    result
  })
}
