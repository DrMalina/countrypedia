import React, { FC } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { CountryCard } from 'components/CountryCard';
import { SkeletonCard } from 'components/SkeletonCard';
import { Country as CountryData, Error } from 'types';

interface CountriesGridProps {
  results: CountryData[];
  isLoading: boolean;
  isSearch: boolean;
  error: Error | null;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: theme.spacing(6),
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(10),
      },
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

export const CountriesGrid: FC<CountriesGridProps> = ({ results, isLoading, isSearch, error }) => {
  const classes = useStyles();

  const renderContent = (): JSX.Element | JSX.Element[] => {
    if (error) {
      return error.status === 404 ? (
        // when api throws 404
        <Typography variant="h5" component="h2" className={classes.status}>
          No results found....
        </Typography>
      ) : (
        // when there is other error
        <Typography variant="h5" component="h2" className={classes.status}>
          Ups! Something went wrong...
        </Typography>
      );
    } else {
      if (isLoading) {
        return Array.from(new Array(8)).map((_element, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
            <SkeletonCard />
          </Grid>
        ));
        // when country exists (there is no 404), results are empty and search exists, it means there is a wrong region chosen
      } else if (!results.length && isSearch) {
        return (
          <Typography variant="h5" component="h2" className={classes.status}>
            No such country in this region....
          </Typography>
        );
      } else {
        // in any other case, map through results
        return results.map((country) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={country.name}>
            <CountryCard
              name={country.name}
              population={country.population}
              region={country.region}
              capital={country.capital}
              flag={country.flag}
            />
          </Grid>
        ));
      }
    }
  };

  return (
    <Grid container spacing={6} className={classes.root}>
      {renderContent()}
    </Grid>
  );
};
