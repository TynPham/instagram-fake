import { Request } from 'express'
import { ParamSchema, checkSchema } from 'express-validator'
import { USER_MESSAGES } from '~/constants/messages'
import database from '~/services/database.services'
import { hashPassword } from '~/utils/crypto'
import { validate } from '~/utils/validation'

const emailSchema: ParamSchema = {
  notEmpty: {
    errorMessage: USER_MESSAGES.EMAIL_IS_REQUIRED
  },
  isEmail: {
    errorMessage: USER_MESSAGES.EMAIL_IS_INVALID
  }
}
const passwordSchema: ParamSchema = {
  trim: true,
  notEmpty: {
    errorMessage: USER_MESSAGES.PASSWORD_IS_REQUIRED
  },
  isLength: {
    errorMessage: USER_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50,
    options: { min: 8, max: 50 }
  }
}

export const loginValidator = validate(
  checkSchema(
    {
      email: {
        ...emailSchema,
        custom: {
          options: async (value, { req }) => {
            const user = await database.users.findOne({ email: value, password: hashPassword(req.body.password) })
            if (!user) {
              throw new Error(USER_MESSAGES.EMAIL_OR_PASSWORD_IS_INCORRECT)
            }
            ;(req as Request).user = user
            return true
          }
        }
      },
      password: passwordSchema
    },
    ['body']
  )
)

export const registerValidator = validate(
  checkSchema(
    {
      email: {
        ...emailSchema,
        custom: {
          options: async (value, { req }) => {
            const user = await database.users.findOne({ email: value })
            if (user) {
              throw new Error(USER_MESSAGES.EMAIL_ALREADY_EXISTS)
            }
            ;(req as Request).user = user
            return true
          }
        }
      },
      name: {
        isString: {
          errorMessage: USER_MESSAGES.NAME_MUST_BE_A_STRING
        },
        trim: true,
        notEmpty: {
          errorMessage: USER_MESSAGES.NAME_IS_REQUIRED
        },
        isLength: {
          errorMessage: USER_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_100,
          options: { min: 1, max: 100 }
        }
      },
      username: {
        isString: {
          errorMessage: USER_MESSAGES.USERNAME_MUST_BE_STRING
        },
        trim: true,
        notEmpty: {
          errorMessage: USER_MESSAGES.USERNAME_IS_REQUIRED
        },
        isLength: {
          errorMessage: USER_MESSAGES.USERNAME_LENGTH,
          options: { min: 1, max: 100 }
        },
        custom: {
          options: async (value) => {
            const user = await database.users.findOne({ name: value })
            if (user) {
              throw new Error(USER_MESSAGES.USERNAME_EXISTED)
            }
            return true
          }
        }
      },
      password: passwordSchema
    },
    ['body']
  )
)
