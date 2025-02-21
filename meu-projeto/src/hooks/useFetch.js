import { useState, useCallback } from 'react';
import axios from 'axios';

export const useFetch = (baseURL = 'https://localhost:7165') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (url, method = 'get', payload = null) => {
    setLoading(true);
    setError(null);
    
    try {
      const axiosInstance = axios.create({ baseURL });
      const response = await axiosInstance[method](url, payload);
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [baseURL]);

  return { data, loading, error, fetchData };
};
