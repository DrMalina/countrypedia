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
  const [{ data, isLoading, error }, doFetch] = useDataApi<Country>(`${BASE_URL}/all`);
  const [regions, setRegions] = useState<string[]>([]);
  const [currentRegion, setCurrentRegion] = useState<string>('All');
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // populate regions only once on first api call
  useEffect(() => {
    if (data.hits.length !== 0 && regions.length === 0) {
      setRegions(['All', ...filterUniqueRegions(data.hits).sort()]);
    }
  }, [data, regions]);

  useEffect(() => {
    if (currentRegion === 'All') {
      setCountries(data.hits);
    } else {
      setCountries(data.hits.filter((country) => country.region === currentRegion));
    }
  }, [currentRegion, data.hits]);

  // filter results based on user input
  useEffect(() => {
    if (typeof debouncedSearchTerm !== 'undefined') {
      let url = '';

      // when input is empty, fetch all countries by default
      if (checkIfEmpty(debouncedSearchTerm)) {
        url = `${BASE_URL}/all`;
      } else {
        url = `${BASE_URL}/name/${debouncedSearchTerm}`;
      }

      doFetch(url);
    }
  }, [debouncedSearchTerm]);

  const handleRegionChange = (region: string) => {
    setCurrentRegion(region);
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
      <CountriesGrid countries={countries} isLoading={isLoading} error={error} />
    </Container>
  );
};

function filterUniqueRegions(countries: Country[]): string[] {
  return [...new Set(countries.map((element) => element.region))].filter(Boolean);
}
