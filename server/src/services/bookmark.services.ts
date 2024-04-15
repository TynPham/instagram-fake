import { ObjectId } from 'mongodb'
import database from './database.services'
import { Bookmark } from '~/models/schemas/bookmark.schema'
import { ErrorWithStatus } from '~/models/errors'
import { HTTP_STATUS_CODE } from '~/constants/httpStatusCode'
import { BOOKMARK_MESSAGES } from '~/constants/messages'

class BookmarkServices {
  async bookmark(user_id: string, post_id: string) {
    const result = await database.bookmarks.findOneAndUpdate(
      {
        user_id: new ObjectId(user_id),
        post_id: new ObjectId(post_id)
      },
      {
        $setOnInsert: new Bookmark({
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

  async unBookmark(user_id: string, post_id: string) {
    const result = await database.bookmarks.findOneAndDelete({
      user_id: new ObjectId(user_id),
      post_id: new ObjectId(post_id)
    })

    if (!result) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS_CODE.BAD_REQUEST,
        message: BOOKMARK_MESSAGES.YOU_HAVE_NOT_BOOKMARKED_THIS_POST
      })
    }

    return result
  }
}

const bookmarkServices = new BookmarkServices()

export default bookmarkServices
