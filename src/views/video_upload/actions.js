import { categoriesApi, videosApi } from '../../configs/api_endpoints.config';
import ApiService from '../../services/api.service';

const uploadVideo = async (key, uploadFile, params, progressEvent) => {
  return ApiService.uploadFile(
    videosApi.default,
    key,
    uploadFile,
    params,
    progressEvent
  );
};

const getCategories = async () => {
  return ApiService.get(categoriesApi.default).then((res) => res.data);
};

const actions = {
  uploadVideo,
  getCategories,
};

export default actions;
