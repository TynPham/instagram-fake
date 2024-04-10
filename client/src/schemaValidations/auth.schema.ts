import { AUTH_MESSAGES } from "@/constants/message";
import z from "zod";

export const loginReqBodySchema = z.object({
  email: z.string().email({ message: AUTH_MESSAGES.EMAIL_IS_INVALID }),
  password: z
    .string()
    .min(8, { message: AUTH_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50 })
    .max(50, { message: AUTH_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50 }),
});

export type LoginReqBodyType = z.infer<typeof loginReqBodySchema>;

export const loginResSchema = z.object({
  message: z.string(),
  result: z.object({
    access_token: z.string(),
    refresh_token: z.string(),
  }),
});

export type LoginResType = z.infer<typeof loginResSchema>;

export const registerReqBodySchema = z.object({
  email: z.string().email({ message: AUTH_MESSAGES.EMAIL_IS_INVALID }),
  name: z
    .string()
    .min(1, { message: AUTH_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_100 })
    .max(100, { message: AUTH_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_100 }),
  username: z
    .string()
    .min(1, { message: AUTH_MESSAGES.USERNAME_LENGTH_MUST_BE_FROM_1_TO_100 })
    .max(100, { message: AUTH_MESSAGES.USERNAME_LENGTH_MUST_BE_FROM_1_TO_100 }),
  password: z
    .string()
    .min(8, { message: AUTH_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50 })
    .max(50, { message: AUTH_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50 }),
});

export type RegisterReqBodyType = z.infer<typeof registerReqBodySchema>;

export const registerResSchema = loginResSchema;
export type RegisterResType = LoginResType;
