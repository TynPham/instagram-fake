import { MediaType, SuccessResponse } from "@/types/common.type";
import http from "@/utils/http";

const MEDIAS_URL = "/medias";

const mediaApi = {
  uploadImage: (formData: FormData) => http.post<SuccessResponse<MediaType[]>>(`${MEDIAS_URL}/upload-image`, formData),
  uploadVideo: (formData: FormData) => http.post<SuccessResponse<MediaType[]>>(`${MEDIAS_URL}/upload-video`, formData),
};

export default mediaApi;
