import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Currency, Language } from 'types';
import { convertToStartCase, convertValueToLocale } from 'utils';

interface Details {
  nativeName: string;
  region: string;
  subregion: string;
  population: number;
  capital: string;
  topLevelDomain: string[];
  currencies: Currency[];
  languages: Language[];
}

interface CountryDetailsProps {
  details: Details;
}

const useStyles = makeStyles(() =>
  createStyles({
    list: {
      listStyle: 'none',
      paddingLeft: 0,
    },
    key: {
      fontWeight: 400,
    },
    value: {
      fontWeight: 300,
    },
  }),
);

export const CountryDetails: FC<CountryDetailsProps> = ({ details }) => {
  const classes = useStyles();

  const renderNestedDetails = (
    arrayLength: number,
    idx: number,
    item: { name: string } | string,
  ) => {
    if (typeof item === 'string') {
      return idx < arrayLength - 1 ? item + ', ' : item;
    } else {
      return idx < arrayLength - 1 ? item.name + ', ' : item.name;
    }
  };

  return (
    <Grid container component="ul" className={classes.list}>
      {Object.entries(details).map(([key, value]) => (
        <Grid key={key} item xs={12} sm={6}>
          <ListItem disableGutters dense alignItems="flex-start">
            <Typography variant="subtitle1" component="span" className={classes.key}>
              {convertToStartCase(key)}:&nbsp;
            </Typography>
            <Typography variant="subtitle1" component="span" className={classes.value}>
              {!Array.isArray(value)
                ? convertValueToLocale(value)
                : value.map((item, idx) => (
                    <Typography
                      key={idx}
                      variant="subtitle1"
                      component="span"
                      className={classes.value}
                    >
                      {renderNestedDetails(value.length, idx, item)}
                    </Typography>
                  ))}
            </Typography>
          </ListItem>
        </Grid>
      ))}
    </Grid>
  );
};
