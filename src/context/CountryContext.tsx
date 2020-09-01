import React, { FC, useState } from 'react';
import { Country } from 'types';

interface CountryCodes {
  [countryCode: string]: string;
}

interface CountryContexProps {
  countries: Country[];
  countryCodes: CountryCodes;
  setCountries: React.Dispatch<React.SetStateAction<Country[]>>;
  setCountryCodes: React.Dispatch<React.SetStateAction<CountryCodes>>;
}

export const CountryContext = React.createContext<CountryContexProps>({} as CountryContexProps);

export const CountryProvider: FC = ({ children }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [countryCodes, setCountryCodes] = useState<CountryCodes>({});

  return (
    <CountryContext.Provider value={{ countries, countryCodes, setCountries, setCountryCodes }}>
      {children}
    </CountryContext.Provider>
  );
};
