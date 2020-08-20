import { useContext } from 'react';
import { CountryContext } from 'context/CountryContext';

export const useCountries = () => {
  return useContext(CountryContext);
};
