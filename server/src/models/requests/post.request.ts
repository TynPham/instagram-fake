import { ObjectId } from 'mongodb'
import { MediaType } from '~/constants/common'

export interface CreatePostBodyReq {
  user_id: string
  captions?: string
  hashtags?: string[]
  medias: MediaType[]
  mentions?: ObjectId[]
}
