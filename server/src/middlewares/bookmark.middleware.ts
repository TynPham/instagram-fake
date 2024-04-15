import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { HTTP_STATUS_CODE } from '~/constants/httpStatusCode'
import { POST_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/errors'
import { validate } from '~/utils/validation'
import database from '~/services/database.services'

export const postIdValidator = validate(
  checkSchema(
    {
      post_id: {
        trim: true,
        custom: {
          options: async (value, { req }) => {
            if (!value) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS_CODE.BAD_REQUEST,
                message: POST_MESSAGES.POST_ID_REQUIRED
              })
            }
            if (!ObjectId.isValid(value)) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS_CODE.BAD_REQUEST,
                message: POST_MESSAGES.INVALID_POST_ID
              })
            }
            const post = await database.posts.findOne({
              _id: new ObjectId(value)
            })
            if (!post) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS_CODE.NOT_FOUND,
                message: POST_MESSAGES.POST_NOT_FOUND
              })
            }

            return true
          }
        }
      }
    },
    ['body', 'params']
  )
)
