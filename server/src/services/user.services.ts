import { ObjectId } from 'mongodb'
import database from './database.services'
import { Follower } from '~/models/schemas/follower.schema'
import { USER_MESSAGES } from '~/constants/messages'
import { User } from '~/models/schemas/User.schema'

class UserServices {
  async follow(user_id: string, followed_user_id: string) {
    const follower = await database.followers.findOne({
      user_id: new ObjectId(user_id),
      followed_user_id: new ObjectId(followed_user_id)
    })

    if (!follower) {
      await database.followers.insertOne(
        new Follower({
          user_id: new ObjectId(user_id),
          followed_user_id: new ObjectId(followed_user_id)
        })
      )
      return {
        message: USER_MESSAGES.FOLLOW_SUCCESS
      }
    }
    return {
      message: USER_MESSAGES.FOLLOWED
    }
  }

  async getMe(user_id: string) {
    const user = await database.users.findOne(
      {
        _id: new ObjectId(user_id)
      },
      {
        projection: {
          password: 0,
          forgot_password_token: 0
        }
      }
    )
    return user
  }

  async getSuggests(user_id: string) {
    const user = await database.users
      .aggregate<User>([
        {
          $match: {
            _id: {
              $nin: [new ObjectId(user_id)]
            }
          }
        },
        {
          $sample: {
            size: 5
          }
        },
        {
          $project: {
            password: 0,
            forgot_password_token: 0
          }
        }
      ])
      .toArray()
    return user
  }
}

const userServices = new UserServices()

export default userServices
