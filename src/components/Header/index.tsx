import React, { FC } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Brightness2OutlinedIcon from '@material-ui/icons/Brightness2Outlined';
import Brightness5OutlinedIcon from '@material-ui/icons/Brightness5Outlined';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
      textAlign: 'left',
    },
    heading: {
      flexGrow: 1,
      fontWeight: 700,
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
  }),
);

interface HeaderProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Header: FC<HeaderProps> = ({ handleChange }) => {
  const classes = useStyles();

  return (
    <>
      <AppBar>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Link component="button" color="textPrimary" underline="none" className={classes.title}>
              <Typography variant="h5" component="h1" className={classes.heading}>
                Where In The World?
              </Typography>
            </Link>
            <Brightness5OutlinedIcon />
            <Switch
              onChange={handleChange}
              name="darkModeSwitch"
              inputProps={{ 'aria-label': 'dark mode switch' }}
            />
            <Brightness2OutlinedIcon />
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
    </>
  );
};
