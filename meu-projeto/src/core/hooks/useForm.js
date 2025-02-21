// Generic Form Hook
import { useState } from 'react';

export const useForm = (initialState = {}, validate = {}) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate field if validator exists
    if (validate[name]) {
      const validationResult = validate[name](value);
      setErrors(prev => ({
        ...prev,
        [name]: validationResult === true ? '' : validationResult
      }));
    }
  };

  const resetForm = () => {
    setValues(initialState);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(validate).forEach(key => {
      const validationResult = validate[key](values[key]);
      if (validationResult !== true) {
        newErrors[key] = validationResult;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    values,
    errors,
    handleChange,
    resetForm,
    validateForm,
    setValues
  };
};
