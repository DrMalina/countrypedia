import React, { FC, useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
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
      marginLeft: 0,
      marginTop: theme.spacing(3),
      paddingBottom: theme.spacing(8),
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(6),
        marginTop: 0,
      },
    },
    wrapper: {
      marginTop: theme.spacing(8),
      flexGrow: 1,
    },
    imageContainer: {
      height: 'auto',
      maxWidth: '100%',
    },
    image: {
      height: 'auto',
      width: '100%',
      boxShadow: '0 0 4px 1px rgba(0,0,0,.1)',
    },
  }),
);

export const CountryPage: FC = () => {
  const location = useLocation();
  const { countries } = useCountries();
  const [country, setCountry] = useState<Country | null>(null);
  const [neighbors, setNeighbors] = useState<Neighbor[]>([]);
  const classes = useStyles();

  const findNeighbor = (alphaCode: string) => {
    const neighbor = countries.find((country) => country.alpha3Code === alphaCode);

    if (neighbor) {
      setNeighbors((prevState) => [
        ...prevState,
        { name: neighbor.name, slug: slugify(neighbor.name, { lower: true }) },
      ]);
    }
  };

  // on location change, find country matching new url
  useEffect(() => {
    //reset scroll
    window.scrollTo(0, 0);
    setNeighbors([]);
    const result = countries.find((country) => country.name === location.state);

    if (result) {
      setCountry(result);
    }
  }, [location]);

  // when country changes, find its new neighbors
  useEffect(() => {
    // each neighbor (border country) is saved as alpha3Code
    if (country) {
      country.borders.forEach((alphaCode) => findNeighbor(alphaCode));
    }
  }, [country]);

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<KeyboardBackspaceIcon />}
        component={RouterLink}
        to="/"
      >
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
              </Grid>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Typography
            variant="h5"
            component="h2"
            display="block"
            align="center"
            className={classes.root}
          >
            No country found...
          </Typography>
        </Grid>
      )}
    </Container>
  );
};
