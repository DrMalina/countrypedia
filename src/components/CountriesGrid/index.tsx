import React, { FC } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { CountriesChunk } from 'components/CountriesChunk';
import { SkeletonCard } from 'components/SkeletonCard';
import { Country as CountryData, Error } from 'types';
import { chunkArray } from 'utils';

interface CountriesGridProps {
  results: CountryData[];
  isLoading: boolean;
  secondLoader: boolean;
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

export const CountriesGrid: FC<CountriesGridProps> = ({
  results,
  isLoading,
  isSearch,
  error,
  secondLoader,
}) => {
  const classes = useStyles();

  const renderContent = (): JSX.Element | JSX.Element[] => {
    if (error) {
      return error.status === 404 ? (
        <Typography variant="h5" component="h2" className={classes.status}>
          No results found....
        </Typography>
      ) : (
        <Typography variant="h5" component="h2" className={classes.status}>
          Ups! Something went wrong...
        </Typography>
      );
    } else {
      if (isLoading || secondLoader) {
        return (
          // when loading, display skeleton cards to keep user busy
          <Grid container item xs={12} spacing={6}>
            {Array.from(new Array(12)).map((_element, idx) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                <SkeletonCard />
              </Grid>
            ))}
          </Grid>
        );
      } else {
        // when country exists (there is no 404), results are empty and search exists, it means there is a wrong region chosen
        return !results.length && isSearch ? (
          <Typography variant="h5" component="h2" className={classes.status}>
            No such country in this region....
          </Typography>
        ) : (
          // in any other case, chunk results for better performance and map through them
          chunkArray(results, 12).map((chunk, id) => <CountriesChunk chunk={chunk} key={id} />)
        );
      }
    }
  };

  return (
    <Grid container justify="center" className={classes.root}>
      {renderContent()}
    </Grid>
  );
};
