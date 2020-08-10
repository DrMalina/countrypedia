import React, { FC } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDataApi } from '../../hooks';
import { Search } from '../Search';
import { RegionFilter } from '../RegionFilter';

const BASE_URL = 'https://restcountries.eu/rest/v2/all';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(10),
      display: 'flex',
      justifyContent: 'space-between',
    },
    filter: {
      width: '12rem',
    },
    select: {
      width: '100%',
    },
  }),
);

export const Dashboard: FC = () => {
  const [{ data, isLoading, isError }, doFetch] = useDataApi('');

  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Search />
      <RegionFilter />
    </Container>
  );
};
