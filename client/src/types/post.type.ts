import { MediaType } from "./common.type";

export type Post = {
  _id: string;
  user_id: string;
  captions: string;
  hashtags: any[];
  medias: MediaType[];
  mentions: any[];
  comments: any[];
  created_at: string | Date;
  updated_at: string | Date;
  user: {
    _id: string;
    name: string;
    username: string;
    email: string;
    avatar: string;
  };
};
