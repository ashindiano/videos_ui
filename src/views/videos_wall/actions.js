import { videosApi } from '../../configs/api_endpoints.config';
import ApiService from '../../services/api.service';

const getVideos = async () => {
  return ApiService.get(videosApi.default).then((res) => res.data);
};

const actions = {
  getVideos,
};

export default actions;
