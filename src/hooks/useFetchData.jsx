import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AxiosInstance from "../utils/AxiosInstance";

const useFetchData = (urlPath, initialRequest = false) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const get = async (params = null) => {
    try {
      const response = await AxiosInstance.get(urlPath, {
        params,
      });
      setData(response.data);
      console.log(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const post = async (body) => {
    try {
      const response = await AxiosInstance.post(urlPath, body);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const put = async (body, params) => {
    try {
      const response = await AxiosInstance.put(urlPath, body, {
        params,
      });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const del = async (params = null) => {
    try {
      const response = await AxiosInstance.delete(urlPath, {
        params,
      });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  if (initialRequest === true) {
    useEffect(() => {
      get();
    }, []);
  }

  return { data, error, loading, get, post, put, del };
};

useFetchData.propTypes = {
  urlPath: PropTypes.string.isRequired,
  initialRequest: PropTypes.bool,
};

export default useFetchData;
