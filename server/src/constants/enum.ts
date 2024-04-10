import { RefreshToken } from './../models/schemas/refresh_token.schema'
export enum UserVerifyStatus {
  Unverified,
  Verified
}

export enum UserAccountType {
  PUBLIC,
  PRIVATE
}

export enum TokenType {
  AccessToken,
  RefreshToken,
  ForgotPasswordToken
}
