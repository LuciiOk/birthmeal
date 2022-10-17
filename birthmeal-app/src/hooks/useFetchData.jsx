import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export const methods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
}

const URL = "https://jsonplaceholder.typicode.com/";

const useFetchData = (path, method = methods.GET, body = null) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL + path, {
          method,
          body,
        });
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, error, loading };
};

useFetchData.propTypes = {
  url: PropTypes.string.isRequired,
  method: PropTypes.oneOf(Object.values(methods)),
  body: PropTypes.object,
};

export default useFetchData;