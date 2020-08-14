import React, { FC, useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { CountriesGrid } from '../CountriesGrid';
import { Search } from '../Search';
import { RegionFilter } from '../RegionFilter';
import { BASE_URL } from '../../api/restcountries';
import { useDataApi, useDebounce } from '../../hooks';
import { Country } from '../../types';
import { checkIfEmpty } from '../../utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(10),
    },
    filters: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
);

export const Dashboard: FC = () => {
  const [{ data, isLoading, isError }, doFetch] = useDataApi<Country>(`${BASE_URL}/all`);
  const [regions, setRegions] = useState<string[]>([]);
  const [currentRegion, setCurrentRegion] = useState<string>('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // populate regions only once on first api call
  useEffect(() => {
    if (data.hits.length !== 0 && regions.length === 0) {
      setRegions(['All', ...filterUniqueRegions(data.hits).sort()]);
    }
  }, [data, regions]);

  // set first region as default when component is mounted
  useEffect(() => {
    if (regions.length > 0) {
      setCurrentRegion(regions[0]);
    }
  }, [regions]);

  useEffect(() => {
    if (currentRegion === 'All') {
      setCountries(data.hits);
    } else {
      setCountries(data.hits.filter((country) => country.region === currentRegion));
    }
  }, [currentRegion]);

  // filter results based on user input
  useEffect(() => {
    if (typeof debouncedSearchTerm !== 'undefined') {
      if (checkIfEmpty(debouncedSearchTerm)) {
        doFetch(`${BASE_URL}/all`);
      } else {
        doFetch(`${BASE_URL}/name/${debouncedSearchTerm}`);
      }
    }
  }, [debouncedSearchTerm]);

  const handleRegionChange = (region: string) => {
    setCurrentRegion(region);
    // doFetch(region === 'All' ? `${BASE_URL}/all` : `${BASE_URL}/region/${region}`);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.root}>
      <div className={classes.filters}>
        <Search handleSearch={handleSearch} />
        <RegionFilter
          regions={regions}
          current={currentRegion}
          handleRegionChange={handleRegionChange}
        />
      </div>
      <CountriesGrid countries={countries} isLoading={isLoading} isError={isError} />
    </Container>
  );
};

function filterUniqueRegions(countries: Country[]): string[] {
  return [...new Set(countries.map((element) => element.region))].filter(Boolean);
}
