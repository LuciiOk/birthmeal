import React, { useEffect, useState } from "react";

const useEnviroments = () => {
  const [enviroment, setEnviroment] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/enviroments");
        const data = await response.json();
        setEnviroment(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return enviroment;
};

export default useEnviroments;
