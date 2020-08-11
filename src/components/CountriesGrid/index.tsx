import React, { FC, useState, useEffect, useRef } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Country } from '../Country';
import { SkeletonCard } from '../SkeletonCard';

interface CountryData {
  name: string;
  population: number;
  region: string;
  capital: string;
  flag: string;
}

interface CountriesGridProps {
  countries: CountryData[];
  isLoading: boolean;
  isError: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: theme.spacing(10),
    },
    loading: {
      marginTop: theme.spacing(12),
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    error: {
      marginTop: theme.spacing(12),
      width: '100%',
      textAlign: 'center',
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
    },
  }),
);

export const CountriesGrid: FC<CountriesGridProps> = ({ countries, isLoading, isError }) => {
  const [showCountries, setShowCountries] = useState<boolean>(false);

  const classes = useStyles();

  return (
    <Grid container spacing={6} className={classes.root}>
      {isError && (
        <Typography variant="h5" component="h2" className={classes.loading}>
          Something went wrong...
        </Typography>
      )}
      {isLoading
        ? Array.from(new Array(8)).map((_element, idx) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
              <SkeletonCard />
            </Grid>
          ))
        : countries.map((country) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={country.name}>
              <Country
                name={country.name}
                population={country.population}
                region={country.region}
                capital={country.capital}
                flag={country.flag}
              />
            </Grid>
          ))}
    </Grid>
  );
};

/*
{isLoading ? (
        <CircularProgress color="secondary" className={classes.loading} />
      ) : (
        countries.map((country) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={country.name}>
            <Country
              name={country.name}
              population={country.population}
              region={country.region}
              capital={country.capital}
              flag={country.flag}
            />
          </Grid>
        ))
      )}
*/
