import AxiosInstance from "./AxiosInstance";

const AxiosHttpRequests = {
  get: (url, params) => {
    return AxiosInstance.get(url, { params });
  },
  post: (url, data) => {
    return AxiosInstance.post(url, data);
  },
  put: (url, data) => {
    return AxiosInstance.put(url, data);
  },
  delete: (url) => {
    return AxiosInstance.delete(url);
  },
};

export default AxiosHttpRequests;
