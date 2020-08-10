import React, { FC } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      marginLeft: 0,
      width: '20rem',
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      padding: theme.spacing(1.6, 1, 1, 0),
      borderRadius: theme.shape.borderRadius,
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      width: '100%',
    },
  }),
);

export const Search: FC = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.search} elevation={2}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search for a country..."
        className={classes.inputRoot}
        inputProps={{ 'aria-label': 'search' }}
      />
    </Paper>
  );
};
