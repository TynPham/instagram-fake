import { config } from 'dotenv'
const env = process.env.NODE_ENV
const envFileName = `.env.${env}`
config({
  path: envFileName
})

export const isProduction = env === 'production'

export const envConfig = {
  mongodbUsername: process.env.MONGODB_USERNAME as string,
  mongodbPassword: process.env.MONGODB_PASSWORD as string,
  mongodbName: process.env.MONGODB_DB_NAME as string,
  mongodbUsersCollection: process.env.MONGODB_USERS_COLLECTION as string,
  mongodbRefreshTokenCollection: process.env.MONGODB_REFRESH_TOKEN_COLLECTION as string,
  mongodbFollowersCollection: process.env.MONGODB_FOLLOWERS_COLLECTION as string,
  mongodbPostsCollection: process.env.MONGODB_POSTS_COLLECTION as string,
  mongodbBookmarksCollection: process.env.MONGODB_BOOKMARKS_COLLECTION as string,
  mongodbLikesCollection: process.env.MONGODB_LIKES_COLLECTION as string,

  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as string,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as string,
  forgotPasswordSecret: process.env.FORGOT_PASSWORD_SECRET as string,

  awsRegion: process.env.AWS_REGION as string,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  s3BucketName: process.env.S3_BUCKET_NAME as string
}
