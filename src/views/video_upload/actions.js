import { videosApi } from '../../configs/api_endpoints.config';
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

const actions = {
  uploadVideo,
};

export default actions;
