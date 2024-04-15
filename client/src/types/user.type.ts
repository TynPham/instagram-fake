export enum UserVerifyStatus {
  Unverified,
  Verified,
}

export enum UserAccountType {
  PUBLIC,
  PRIVATE,
}

export type User = {
  _id: string;
  name: string;
  username: string;
  email: string;
  verify_status: UserVerifyStatus;
  account_type: UserAccountType;
  created_at: string | Date;
  updated_at: string | Date;
  gender: string;
  day_of_birth: string | Date;
  bio: string;
  website: string;
  avatar: string;
};
