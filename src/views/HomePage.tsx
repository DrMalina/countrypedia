import React, { FC, useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { BASE_URL } from 'api/restcountries';
import { CountriesGrid } from 'components/CountriesGrid';
import { Search } from 'components/Search';
import { RegionFilter } from 'components/RegionFilter';
import { useDataApi, useDebounce, useCountries } from 'hooks';
import { Country } from 'types';
import { checkIfEmpty } from 'utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(10),
    },
    filters: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    },
  }),
);

export const HomePage: FC = () => {
  const [{ data, isLoading, error }, doFetch] = useDataApi<Country>('');
  const { countries, setCountries } = useCountries();
  const [regions, setRegions] = useState<string[]>([]);
  const [currentRegion, setCurrentRegion] = useState<string>('All');
  const [results, setResults] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const classes = useStyles();

  // populate countries on api call
  useEffect(() => {
    if (data.hits.length !== 0) {
      setCountries(data.hits);
    }
  }, [data]);

  // populate regions only once on first api call
  useEffect(() => {
    if (data.hits.length !== 0 && regions.length === 0) {
      setRegions(['All', ...filterUniqueRegions(data.hits).sort()]);
    }
  }, [data, regions]);

  // filter results based on chosen region
  useEffect(() => {
    if (currentRegion === 'All') {
      setResults(countries);
    } else {
      setResults(countries.filter((country) => country.region === currentRegion));
    }
  }, [countries, currentRegion]);

  // filter results based on user input
  useEffect(() => {
    let url = '';

    // when input is empty, fetch all countries by default
    if (checkIfEmpty(debouncedSearchTerm)) {
      url = `${BASE_URL}/all`;
    } else {
      url = `${BASE_URL}/name/${debouncedSearchTerm}`;
    }

    doFetch(url);
  }, [debouncedSearchTerm]);

  const handleRegionChange = (region: string) => {
    setCurrentRegion(region);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

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
      <CountriesGrid results={results} isLoading={isLoading} error={error} />
    </Container>
  );
};

function filterUniqueRegions(countries: Country[]): string[] {
  return [...new Set(countries.map((country) => country.region))].filter(Boolean);
}
