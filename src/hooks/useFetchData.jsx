import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const methods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const URL = "http://localhost:3000/";

const useFetchData = (path, method = methods.GET, body = null) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [path]);

  const fetchData = async () => {
    try {
      const response = await axios({
        method,
        url: `${URL}${path}`,
        data: body,
      });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { data, error, loading };
};

useFetchData.propTypes = {
  url: PropTypes.string.isRequired,
  method: PropTypes.oneOf(Object.values(methods)),
  body: PropTypes.object,
};

export default useFetchData;
