import { useState } from "react";

const useFields = (initialState) => {
  const [fields, setValues] = useState(initialState);

  const setField = (field, value) => {
    setValues({
      ...fields,
      [field]: value,
    });
  };
}