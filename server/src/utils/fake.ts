import { faker } from '@faker-js/faker'
import { ObjectId, WithId } from 'mongodb'
import { Media } from '~/constants/enum'
import { RegisterReqBody } from '~/models/requests/auth.request'
import { CreatePostBodyReq } from '~/models/requests/post.request'
import { User } from '~/models/schemas/User.schema'
import { Follower } from '~/models/schemas/follower.schema'
import { Post } from '~/models/schemas/post.schema'
import databaseService from '~/services/database.services'
import { hashPassword } from '~/utils/crypto'

const PASSWORD = 'Tuyen123123'

const MYID = new ObjectId('661cb71c4febeb02e0893d16')

const USER_COUNT = 30

const createRandomUser = () => {
  const user: RegisterReqBody & { avatar: string } = {
    username: faker.internet.userName(),
    name: faker.internet.displayName(),
    email: faker.internet.email(),
    password: hashPassword(PASSWORD),
    avatar: faker.image.avatarLegacy()
  }
  return user
}

const createRandomPost = () => {
  const tweet: CreatePostBodyReq = {
    captions: faker.lorem.paragraph({
      min: 1,
      max: 3
    }),
    hashtags: [],
    medias: [
      {
        type: Media.Image,
        url: faker.image.url()
      }
    ],
    mentions: []
  }
  return tweet
}
const users: RegisterReqBody[] = faker.helpers.multiple(createRandomUser, {
  count: USER_COUNT
})

const insertMultipleUsers = async (users: RegisterReqBody[]) => {
  console.log('Creating users...')
  const result = await Promise.all(
    users.map(async (user) => {
      const user_id = new ObjectId()
      await databaseService.users.insertOne(
        new User({
          ...user,
          _id: user_id
        })
      )
      return user_id
    })
  )
  console.log(`Created ${result.length} users`)
  return result
}

const followMultipleUsers = async (user_id: ObjectId, followed_user_ids: ObjectId[]) => {
  console.log('Start following...')
  const result = await Promise.all(
    followed_user_ids.map((followed_user_id) =>
      databaseService.followers.insertOne(
        new Follower({
          user_id,
          followed_user_id: new ObjectId(followed_user_id)
        })
      )
    )
  )
  console.log(`Followed ${result.length} users`)
}

const insertPost = async (user_id: ObjectId, body: CreatePostBodyReq) => {
  const result = await databaseService.posts.insertOne(
    new Post({
      captions: body.captions,
      hashtags: body.hashtags,
      mentions: body.mentions,
      medias: body.medias,
      user_id: new ObjectId(user_id)
    })
  )
  return result
}

const insertMultiplePosts = async (ids: ObjectId[]) => {
  console.log('Creating posts...')
  console.log(`Counting...`)
  let count = 0
  const result = await Promise.all(
    ids.map(async (id, index) => {
      await Promise.all([insertPost(id, createRandomPost()), insertPost(id, createRandomPost())])
      count += 2
      console.log(`Created ${count} posts`)
    })
  )
  return result
}

insertMultipleUsers(users).then((ids) => {
  followMultipleUsers(new ObjectId(MYID), ids).catch((err) => {
    console.error('Error when following users')
    console.log(err)
  })
  insertMultiplePosts(ids).catch((err) => {
    console.error('Error when creating posts')
    console.log(err)
  })
})
