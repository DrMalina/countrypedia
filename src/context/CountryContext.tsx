import React, { FC, useState } from 'react';
import { Country } from 'types';

interface CountryContexProps {
  countries: Country[];
  setCountries: React.Dispatch<React.SetStateAction<Country[]>>;
}

export const CountryContext = React.createContext<CountryContexProps>({} as CountryContexProps);

export const CountryProvider: FC = ({ children }) => {
  const [countries, setCountries] = useState<Country[]>([]);

  return (
    <CountryContext.Provider value={{ countries, setCountries }}>
      {children}
    </CountryContext.Provider>
  );
};
