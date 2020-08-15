import React, { FC } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Country } from '../Country';
import { SkeletonCard } from '../SkeletonCard';
import { Country as CountryData, Error } from '../../types';

interface CountriesGridProps {
  countries: CountryData[];
  isLoading: boolean;
  error: Error | null;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: theme.spacing(10),
    },
    status: {
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

export const CountriesGrid: FC<CountriesGridProps> = ({ countries = [], isLoading, error }) => {
  const classes = useStyles();

  const renderContent = (): JSX.Element | JSX.Element[] => {
    if (error) {
      if (error.status === 404) {
        return (
          <Typography variant="h5" component="h2" className={classes.status}>
            No country found....
          </Typography>
        );
      } else {
        console.log(error);
        return (
          <Typography variant="h5" component="h2" className={classes.status}>
            Something went wrong...
          </Typography>
        );
      }
    } else {
      return isLoading
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
          ));
    }
  };

  return (
    <Grid container spacing={6} className={classes.root}>
      {renderContent()}
    </Grid>
  );
};
