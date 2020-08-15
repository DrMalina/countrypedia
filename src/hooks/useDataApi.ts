import { useState, useEffect } from 'react';
import axios from 'axios';
import { Error } from '../types/';

type Query = string;
type Loading = boolean;
type SetUrl = React.Dispatch<React.SetStateAction<string>>;

interface Data<T> {
  hits: T[];
}

interface Result<T> {
  data: Data<T>;
  isLoading: Loading;
  error: Error | null;
}

export const useDataApi = <T>(query: Query): [Result<T>, SetUrl] => {
  const [data, setData] = useState<Data<T>>({ hits: [] });
  const [url, setUrl] = useState<string>(query);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setIsLoading(true);

      try {
        const result = await axios.get(url);
        setData({ hits: result.data });
      } catch (error) {
        setError({ status: error.response.data.status, message: error.response.data.message });
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [{ data, isLoading, error }, setUrl];
};
