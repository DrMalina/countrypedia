import React, { FC, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import slugify from 'slugify';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { BASE_URL } from 'api/restcountries';
import { CountriesGrid } from 'components/CountriesGrid';
import { Search } from 'components/Search';
import { RegionFilter } from 'components/RegionFilter';
import { useDataApi, useDebounce, useCountries, useRegions } from 'hooks';
import { Country } from 'types';
import { checkIfEmptyString, pickRandomElement } from 'utils';

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
  const { countries, countryCodes, setCountryCodes, setCountries } = useCountries();
  const { regions, currentRegion, setRegions, setCurrentRegion } = useRegions();
  const [results, setResults] = useState<Country[]>([]);
  const [resultsLoader, setResultsLoader] = useState<boolean>(false);
  const [randomCountry, setRandomCountry] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const classes = useStyles();
  const smScreen = useMediaQuery('(max-width:600px)');

  // populate countries and regions only once on first api call
  useEffect(() => {
    if (!countries.length && data.hits.length) {
      setCountries(data.hits);
      setRegions(['All', ...filterUniqueRegions(data.hits).sort()]);

      // for each country create a pair of code & name => {'GER': 'Germany'}
      // it will be used to optimize finding country neighbors on individual country page
      let alphaCodes: { [key: string]: string } = {};
      data.hits.forEach((country) => {
        alphaCodes[country.alpha3Code] = country.name;
      });
      setCountryCodes(alphaCodes);
    }
  }, [data, countries.length, setCountries, setCountryCodes, setRegions]);

  // filter results based on selected regions
  useEffect(() => {
    // there is a second loader here to deal with the edge case between updating data.hits when searchTerm exists:
    // after each call data.hits resets, so if there was no secondLoader, on user search there would be displayed
    // a msg for split second 'No country found' before loading starts. That is why loading is extended here to make sure to display
    // results only when they are fetched
    setResultsLoader(true);
    // if there is an user input, use api response, else use all countries (=context)
    const searchResults = debouncedSearchTerm ? data.hits : countries;

    if (currentRegion === 'All') {
      setResults(searchResults);
    } else {
      setResults(searchResults.filter((country) => country.region === currentRegion));
    }

    setResultsLoader(!searchResults.length);
  }, [data.hits, currentRegion, countries, debouncedSearchTerm]);

  // make request based on search term
  useEffect(() => {
    let url = '';

    if (checkIfEmptyString(debouncedSearchTerm)) {
      if (!countries.length) {
        url = `${BASE_URL}/all`;
      }
    } else {
      url = `${BASE_URL}/name/${debouncedSearchTerm}`;
    }

    doFetch(url);
  }, [debouncedSearchTerm, countries, doFetch]);

  // set random country
  useEffect(() => {
    const countryCodesKeys = Object.keys(countryCodes);

    if (countryCodesKeys.length) {
      const randomKey = pickRandomElement(countryCodesKeys);
      setRandomCountry(countryCodes[randomKey]);
    }
  }, [countryCodes]);

  const handleRegionChange = (region: string) => {
    setCurrentRegion(region);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid container alignItems="center" justify="center" spacing={4}>
        <Grid container item justify="center" sm={6} md={8} spacing={4}>
          <Grid container item md={6} justify={smScreen ? 'center' : 'flex-start'}>
            <Search handleSearch={handleSearch} />
          </Grid>
          <Grid container item md={6} justify={smScreen ? 'center' : 'flex-start'}>
            <Button
              disabled={!randomCountry}
              variant="contained"
              color="secondary"
              size={smScreen ? 'large' : 'medium'}
              component={RouterLink}
              to={{
                pathname: `/${slugify(randomCountry, { lower: true })}`,
                state: randomCountry,
              }}
            >
              Choose random country
            </Button>
          </Grid>
        </Grid>
        <Grid container item sm={6} md={4} justify={smScreen ? 'center' : 'flex-end'}>
          <RegionFilter
            regions={regions}
            current={currentRegion}
            handleRegionChange={handleRegionChange}
          />
        </Grid>
      </Grid>
      <CountriesGrid
        results={results}
        isLoading={isLoading}
        secondLoader={resultsLoader}
        isSearch={!checkIfEmptyString(debouncedSearchTerm)}
        error={error}
      />
    </Container>
  );
};

function filterUniqueRegions(countries: Country[]): string[] {
  return [...new Set(countries.map((country) => country.region))].filter(Boolean);
}
