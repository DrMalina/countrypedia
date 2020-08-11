import React, { FC, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { CountriesGrid } from '../CountriesGrid';
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
  const [{ data, isLoading, isError }, doFetch] = useDataApi(ALL_COUNTRIES_URL);
  const [regions, setRegions] = useState<string[]>([]);

  useEffect(() => {
    // populate regions selector only once on first api call
    if (data.hits.length !== 0 && regions.length === 0) {
      setRegions(['All', ...filterUniqueValues(data.hits, 'region').sort()]);
    }
    return () => {};
  }, [data, regions]);

  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.root}>
      <div className={classes.filters}>
        <Search />
        <RegionFilter regions={regions} doFetch={doFetch} />
      </div>
      <CountriesGrid countries={data.hits} isLoading={isLoading} isError={isError} />
    </Container>
  );
};
