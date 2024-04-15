import { ObjectId } from 'mongodb'
import database from './database.services'
import { ErrorWithStatus } from '~/models/errors'
import { HTTP_STATUS_CODE } from '~/constants/httpStatusCode'
import { LIKE_MESSAGES } from '~/constants/messages'
import { Like } from '~/models/schemas/like.schemas'

class LikeServices {
  async like(user_id: string, post_id: string) {
    const result = await database.likes.findOneAndUpdate(
      {
        user_id: new ObjectId(user_id),
        post_id: new ObjectId(post_id)
      },
      {
        $setOnInsert: new Like({
          user_id: new ObjectId(user_id),
          post_id: new ObjectId(post_id)
        })
      },
      {
        upsert: true,
        returnDocument: 'after'
      }
    )

    return result
  }

  async unLike(user_id: string, post_id: string) {
    const result = await database.likes.findOneAndDelete({
      user_id: new ObjectId(user_id),
      post_id: new ObjectId(post_id)
    })

    if (!result) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS_CODE.BAD_REQUEST,
        message: LIKE_MESSAGES.YOU_HAVE_NOT_LIKED_THIS_POST
      })
    }

    return result
  }
}

const likeServices = new LikeServices()

export default likeServices
