import React, { FC } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(10),
      display: 'flex',
      justifyContent: 'space-between',
    },
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
    filter: {
      width: '12rem',
    },
    select: {
      width: '100%',
    },
  }),
);

export const Dashboard: FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.root}>
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
      <div className={classes.filter}>
        <FormControl className={classes.select}>
          <InputLabel>Choose a region</InputLabel>
          <Select labelId="demo-simple-select-label">
            <MenuItem value={10}>Africa</MenuItem>
            <MenuItem value={20}>North America</MenuItem>
            <MenuItem value={30}>Europe</MenuItem>
          </Select>
        </FormControl>
      </div>
    </Container>
  );
};
