import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../constants/Api";

const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

AxiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// set timeout for all requests
AxiosInstance.defaults.timeout = 10000; // 15 seconds

// verify network connection
AxiosInstance.defaults.validateStatus = (status) => {
  // if there is no network connection, status will be 0 throw an error
  if (status === 0) {
    throw new Error("Network Error");
  }
};

// replace all data response _id to id
AxiosInstance.interceptors.response.use(
  (response) => {
    // verify if response is array
    if (Array.isArray(response.data)) {
      response.data.map((item) => {
        item.id = item._id;
        delete item._id;
      });
    } // if data is paginated
    else if (response.data.data) {
      response.data.data.map((item) => {
        item.id = item._id;
        delete item._id;
      });
    } else {
      response.data.id = response.data._id;
      delete response.data._id;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosInstance;
