import { ParamsDictionary } from 'express-serve-static-core'
import { NextFunction, Request, Response } from 'express'
import { BookmarkReqBody, UnBookmarkReqParams } from '~/models/requests/bookmark.request'
import { HTTP_STATUS_CODE } from '~/constants/httpStatusCode'
import { BOOKMARK_MESSAGES } from '~/constants/messages'
import bookmarkServices from '~/services/bookmark.services'

export const bookmarkController = async (
  req: Request<ParamsDictionary, any, BookmarkReqBody>,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.decoded_authorization?.user_id as string
  const post_id = req.body.post_id

  const result = await bookmarkServices.bookmark(user_id, post_id)

  return res.status(HTTP_STATUS_CODE.OK).json({
    message: BOOKMARK_MESSAGES.BOOKMARK_SUCCESSFULLY,
    result
  })
}

export const unBookmarkController = async (req: Request<UnBookmarkReqParams>, res: Response, next: NextFunction) => {
  const user_id = req.decoded_authorization?.user_id as string
  const post_id = req.params.post_id

  const result = await bookmarkServices.unBookmark(user_id, post_id)

  return res.status(HTTP_STATUS_CODE.OK).json({
    message: BOOKMARK_MESSAGES.UNBOOKMARK_SUCCESSFULLY,
    result
  })
}
