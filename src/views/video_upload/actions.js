import { videosApi } from '../../configs/api_endpoints.config';
import ApiService from '../../services/api.service';

const uploadSohData = async (key, uploadFile, params, progressEvent) => {
  return ApiService.uploadFile(
    videosApi.default,
    key,
    uploadFile,
    params,
    progressEvent
  );
};

const sohUploadActions = {
  uploadSohData,
};

export default sohUploadActions;
