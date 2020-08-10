import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Query = string;
type Loading = boolean;
type Error = boolean;
type SetUrl = React.Dispatch<React.SetStateAction<string>>;

interface Data {
  hits: [];
}

interface Result {
  data: Data;
  isLoading: Loading;
  isError: Error;
}

export const useDataApi = (query: Query): [Result, SetUrl] => {
  const [data, setData] = useState<Data>({ hits: [] });
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
