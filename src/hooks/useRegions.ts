import { useContext } from 'react';
import { RegionsContext } from 'context/RegionsContext';

export const useRegions = () => {
  return useContext(RegionsContext);
};
