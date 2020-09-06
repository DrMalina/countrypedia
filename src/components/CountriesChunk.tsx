import React, { FC } from 'react';
import { useInView } from 'react-intersection-observer';
import Grid from '@material-ui/core/Grid';
import { CountryCard } from 'components/CountryCard';
import { Country } from 'types';

interface CountriesChunkProps {
  chunk: Country[];
}

// results are divided into chunks (grid of 12 countries), for better performance
export const CountriesChunk: FC<CountriesChunkProps> = ({ chunk }) => {
  // intersection observer determines if current chunk is in view in order to be rendered
  // inView props is then passed to CountryCard
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  return (
    <Grid container item xs={12} spacing={6} ref={ref} style={{ marginBottom: '24px' }}>
      {chunk.map((country) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={country.name}>
          <CountryCard
            inView={inView}
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
