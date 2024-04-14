import { CreatePostBodyReq } from '~/models/requests/post.request'
import database from './database.services'
import { Post } from '~/models/schemas/post.schema'
import { ObjectId } from 'mongodb'

class PostServices {
  async createPost(user_id: string, body: CreatePostBodyReq) {
    const result = await database.posts.insertOne(
      new Post({
        user_id: new ObjectId(user_id),
        captions: body.captions,
        hashtags: body.hashtags,
        medias: body.medias,
        mentions: body.mentions
      })
    )
    return result
  }

  async getNewFeeds(user_id: string, page: number, limit: number) {
    const user_id_obj = new ObjectId(user_id)
    const follower = await database.followers
      .find(
        { user_id: user_id_obj },
        {
          projection: {
            followed_user_id: 1,
            _id: 0
          }
        }
      )
      .toArray()

    const followed_user_ids = follower.map((item) => item.followed_user_id)
    followed_user_ids.push(user_id_obj)
    const [posts, total] = await Promise.all([
      database.posts
        .aggregate<Post>([
          {
            $match: {
              user_id: {
                $in: followed_user_ids
              }
            }
          },
          {
            $lookup: {
              from: 'users',
              localField: 'user_id',
              foreignField: '_id',
              as: 'user'
            }
          },
          {
            $addFields: {
              user: {
                $map: {
                  input: '$user',
                  as: 'item',
                  in: {
                    _id: '$$item._id',
                    name: '$$item.name',
                    username: '$$item.username',
                    email: '$$item.email'
                  }
                }
              }
            }
          },
          {
            $unwind: {
              path: '$user'
            }
          },
          {
            $skip: limit * (page - 1)
          },
          {
            $limit: limit
          }
        ])
        .toArray(),
      database.posts.countDocuments({
        user_id: {
          $in: followed_user_ids
        }
      })
    ])
    return {
      posts,
      total
    }
  }
}

const postServices = new PostServices()

export default postServices
