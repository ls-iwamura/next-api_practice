import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useState, useEffect } from "react";

const useFetch = <T>(
  url: string,
  options?: Omit<AxiosRequestConfig, "signal">
) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(url, {
          ...options,
          signal: controller.signal,
        });
        setData(res.data);
        setError(undefined);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    return () => controller.abort();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
