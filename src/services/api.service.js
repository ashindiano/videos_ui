import axios from 'axios';
import _ from 'lodash';
import apiVersion from '../configs/api_endpoints.config';

import runTimeConfig from '../configs/runtime.config';

class APIService {
  // creating multiple Api requests and storing in a array
  axiosInstance = undefined;

  constructor(inst) {
    this.axiosInstance = inst;
    this.axiosInstance.interceptors.request.use(
      (_req) => {
        const req = _.cloneDeep(_req);
        if (runTimeConfig && runTimeConfig.accessTokens)
          req.headers = {
            ..._req.headers,
            Authorization: `Bearer ${runTimeConfig.accessTokens.backend}`,
          };

        return req;
      },
      (error) => {
        // Do something with request error
        return Promise.reject(error);
      }
    );
  }

  get = async (url, params) => this.axiosInstance.get(url, { params });

  deleteMethod = (url) =>
    axios({
      method: 'delete',
      url,
    });

  put = (url, params) =>
    this.axiosInstance({
      method: 'put',
      url,
      data: params,
    });

  post = (url, params) =>
    this.axiosInstance({
      method: 'post',
      url,
      data: params,
    });

  // eslint-disable-next-line default-param-last
  uploadFile = (url, key, file, params = {}, uploadProgressEvent) => {
    const formData = new FormData();
    Object.keys(params).forEach((k) => formData.append(k, params[k]));
    formData.append(key, file);
    const cancelToken = axios.CancelToken.source();
    return this.axiosInstance({
      method: 'post',
      url,
      data: formData,
      cancelToken: cancelToken.token,
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.floor(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (_.isFunction(uploadProgressEvent))
          uploadProgressEvent(percentCompleted, cancelToken);
      },
    });
  };

  exportFile = (url, params, downloadProgressEvent) => {
    return this.axiosInstance({
      method: 'post',
      url,
      data: params,
      responseType: 'arraybuffer',
      onDownloadProgress: (progressEvent) => {
        const percentCompleted = Math.floor(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (_.isFunction(downloadProgressEvent))
          downloadProgressEvent(percentCompleted);
      },
    }).then((res) => {
      const filename = res.headers['content-disposition']
        .split(';')
        .find((n) => n.includes('filename='))
        .replace('filename=', '')
        .trim();

      const finalUrl = window.URL.createObjectURL(
        new Blob([res.data], { type: res.headers['content-type'] })
      );
      const link = document.createElement('a');
      link.href = finalUrl;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    });
  };

  viewFile = (url, downloadProgressEvent) => {
    return this.axiosInstance({
      method: 'get',
      url,
      responseType: 'arraybuffer',
      onDownloadProgress: (progressEvent) => {
        const percentCompleted = Math.floor(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (_.isFunction(downloadProgressEvent))
          downloadProgressEvent(percentCompleted);
      },
    }).then((res) => {
      const filename = res.headers['content-disposition']
        .split(';')
        .find((n) => n.includes('filename='))
        .replace('filename=', '')
        .trim();

      const finalUrl = window.URL.createObjectURL(
        new Blob([res.data], { type: res.headers['content-type'] })
      );
      const link = document.createElement('a');
      link.href = finalUrl;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      window.open(finalUrl);
    });
  };

  concurrent = (requests) => {
    return this.axiosInstance.all(requests);
  };
}

const ApiService = new APIService(
  axios.create({
    baseURL: process.env.REACT_APP_PUBLIC_DOMAIN + apiVersion,
  })
);

export default ApiService;
