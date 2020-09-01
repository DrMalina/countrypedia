import React, { FC, useState } from 'react';

interface RegionsContextProps {
  regions: string[];
  currentRegion: string;
  setRegions: React.Dispatch<React.SetStateAction<string[]>>;
  setCurrentRegion: React.Dispatch<React.SetStateAction<string>>;
}

export const RegionsContext = React.createContext<RegionsContextProps>({} as RegionsContextProps);

export const RegionsProvider: FC = ({ children }) => {
  const [regions, setRegions] = useState<string[]>([]);
  const [currentRegion, setCurrentRegion] = useState<string>('All');

  return (
    <RegionsContext.Provider value={{ regions, currentRegion, setRegions, setCurrentRegion }}>
      {children}
    </RegionsContext.Provider>
  );
};
