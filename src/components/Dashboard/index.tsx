import React, { FC, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { CardsGrid } from '../CardsGrid';
import { Search } from '../Search';
import { RegionFilter } from '../RegionFilter';
import { useDataApi } from '../../hooks';
import { filterUniqueValues } from '../../utils';

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

const ALL_COUNTRIES_URL = 'https://restcountries.eu/rest/v2/all';

export const Dashboard: FC = () => {
  const [{ data, isLoading, isError }, doFetch] = useDataApi('');
  const [regions, setRegions] = useState<string[]>(['All', 'Oceania']);

  useEffect(() => {
    // populate regions select only once on first api call
    if (data.hits.length !== 0 && regions.length === 0) {
      setRegions(['All', ...filterUniqueValues(data.hits, 'region').sort()]);
    }
  }, [data, regions]);

  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.root}>
      <div className={classes.filters}>
        <Search />
        <RegionFilter regions={regions} />
      </div>
      <CardsGrid />
    </Container>
  );
};
