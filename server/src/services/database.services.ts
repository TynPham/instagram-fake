import { Collection, Db, MongoClient } from 'mongodb'
import { config } from 'dotenv'
import { envConfig } from '~/utils/config'
import { User } from '~/models/schemas/User.schema'
import { RefreshToken } from '~/models/schemas/refresh_token.schema'
config()
const uri = `mongodb+srv://${envConfig.mongodbUsername}:${envConfig.mongodbPassword}@instagram-dev.xuoa8cn.mongodb.net/?retryWrites=true&w=majority&appName=Instagram-dev`

class DataBaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(envConfig.mongodbName)
  }

  async connectDB() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  get users(): Collection<User> {
    return this.db.collection(envConfig.mongodbUsersCollection)
  }

  get refresh_tokens(): Collection<RefreshToken> {
    return this.db.collection(envConfig.mongodbRefreshTokenCollection)
  }
}

const database = new DataBaseService()

export default database
