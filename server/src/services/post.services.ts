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
}

const postServices = new PostServices()

export default postServices
