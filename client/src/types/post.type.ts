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
  bookmarks: Bookmark[];
  likes: Like[];
};

export type Bookmark = {
  _id: string;
  post_id: string;
  user_id: string;
  created_at: string | Date;
};

export type Like = Bookmark;

export type CreatePostBodyReq = {
  captions?: string;
  hashtags?: string[];
  medias: MediaType[];
  mentions?: string[];
};
