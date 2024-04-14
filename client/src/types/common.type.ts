export type Pagination = {
  page: number;
  limit: number;
};

export enum Media {
  IMAGE,
  VIDEO,
}

export type MediaType = {
  type: Media;
  url: string;
};

export type SuccessResponse<T> = {
  message: string;
  result: T;
};

export type SuccessResponseWithPagination<T> = {
  message: string;
  result: T;
  page: number;
  limit: number;
  totalPage: number;
};
