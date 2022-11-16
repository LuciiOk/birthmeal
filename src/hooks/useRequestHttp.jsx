import { useReducer, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import AxiosInstance from "../utils/AxiosInstance";

const initialState = {
  data: [],
  loading: true,
  error: null,
  queryParams: null
};

// add reload page
const reducer = (state, action) => {
  switch (action.type) {
  case "FETCH_SUCCESS":
    return {
      ...state,
      data: action.payload,
      loading: false,
    };
  case "FETCH_ERROR":
    return {
      ...state,
      error: action.payload,
      loading: false,
    };
  case "FETCH_LOADING":
    return {
      ...state,
      loading: true,
    };
  case "FETCH_QUERY_PARAMS":
    return {
      ...state,
      queryParams: action.payload,
    };
  default:
  }
};

const useRequestHttp = (url, method, body) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = useCallback(async (queryParams = null) => {
    dispatch({ type: "FETCH_LOADING" });
    try {
      const response = await AxiosInstance({
        url,
        method,
        data: body,
        params: queryParams,
      });
      dispatch({ type: "FETCH_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error });
    }
  }, [url, method, body]);

  useEffect(() => {
    // throw new Error("useRequestHttp: url is required");
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    fetchData,
  };
};

useRequestHttp.propTypes = {
  url: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  body: PropTypes.object,
};

export default useRequestHttp;
