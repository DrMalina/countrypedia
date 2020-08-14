import { useState, useEffect } from 'react';
import axios from 'axios';

type Query = string;
type Loading = boolean;
type Error = boolean;
type SetUrl = React.Dispatch<React.SetStateAction<string>>;

interface Data<T> {
  hits: T[];
}

interface Result<T> {
  data: Data<T>;
  isLoading: Loading;
  isError: Error;
}

export const useDataApi = <T>(query: Query): [Result<T>, SetUrl] => {
  const [data, setData] = useState<Data<T>>({ hits: [] });
  const [url, setUrl] = useState<string>(query);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios.get(url);
        setData({ hits: result.data });
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};
