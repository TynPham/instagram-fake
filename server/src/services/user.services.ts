import { LoginReqBody, RegisterReqBody } from '~/models/requests/user.request'
import database from './database.services'
import { User } from '~/models/schemas/User.schema'
import { hashPassword } from '~/utils/crypto'

class UserServices {
  async login(body: LoginReqBody) {
    return true
  }

  async register(body: RegisterReqBody) {
    const user = await database.users.insertOne(new User({ ...body, password: hashPassword(body.password) }))
    return user
  }
}

const userServices = new UserServices()

export default userServices
