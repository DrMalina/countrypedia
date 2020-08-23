import React, { FC, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import slugify from 'slugify';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { CountryDetails } from 'components/CountryDetails';
import { NeighborList } from 'components/NeighborList';
import { useCountries } from 'hooks';
import { Country, Neighbor } from 'types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(10),
    },
    title: {
      fontWeight: 700,
    },
    subtitle: {
      fontWeight: 400,
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
    list: {
      listStyle: 'none',
      paddingLeft: 0,
    },
    info: {
      marginLeft: theme.spacing(6),
    },
    wrapper: {
      marginTop: theme.spacing(8),
      flexGrow: 1,
    },
    imageContainer: {
      height: '575px',
      width: '100%',
      border: '1px solid black',
    },
    image: {
      height: '100%',
      width: '100%',
    },
  }),
);

export const CountryPage: FC = () => {
  const { state } = useLocation();
  const { countries } = useCountries();
  const [country, setCountry] = useState<Country | null>(null);
  const [neighbors, setNeighbors] = useState<Neighbor[]>([]);
  const classes = useStyles();

  const findNeighbor = (alphaCode: string) => {
    const neighbor = countries.find((country) => country.alpha3Code === alphaCode);

    if (neighbor) {
      setNeighbors([
        ...neighbors,
        { name: neighbor.name, slug: slugify(neighbor.name, { lower: true }) },
      ]);
    }
  };

  useEffect(() => {
    const result = countries.find((country) => country.name === state);
    if (result) {
      setCountry(result);
    }
  }, [countries]);

  useEffect(() => {
    if (country) {
      country.borders.forEach((alphaCode) => findNeighbor(alphaCode));
    }
  }, [country]);

  return (
    <>
      <Container maxWidth="lg" className={classes.root}>
        <Button variant="contained" color="secondary" startIcon={<KeyboardBackspaceIcon />}>
          Back
        </Button>
        {country ? (
          <Grid container className={classes.wrapper} alignItems="center">
            <Grid item xs={12} md={6} className={classes.imageContainer}>
              <img src={country.flag} alt={`Flag of a ${country.name}`} className={classes.image} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className={classes.info}>
                <Typography variant="h5" component="h2" className={classes.title}>
                  {country.name}
                </Typography>
                <CountryDetails
                  details={{
                    nativeName: country.nativeName,
                    population: country.population,
                    region: country.region,
                    subregion: country.subregion,
                    capital: country.capital,
                    topLevelDomain: country.topLevelDomain,
                    currencies: country.currencies,
                    languages: country.languages,
                  }}
                />
                <Typography variant="h6" component="h3" className={classes.subtitle}>
                  Border Countries:
                </Typography>
                <Grid container component="ul" className={classes.list} spacing={1}>
                  <NeighborList neighbors={neighbors} />
                  {/* {country.borders.map((country) => (
                    <Grid item xs={12} sm={4} key={country}>
                      <Card>
                        <CardActionArea>
                          <Paper>
                            <ListItem className={classes.borderCountry}>{country}</ListItem>
                          </Paper>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))} */}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        ) : null}
      </Container>
    </>
  );
};
