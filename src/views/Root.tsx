import React, { FC, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Header } from '../components/Header';
import { lightMode, darkMode } from '../theme';
import { routes } from '../routes';
import { CountryPage } from './CountryPage';
import { HomePage } from './HomePage';

const Root: FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const palletType = isDarkMode ? 'dark' : 'light';
  const currentTheme = isDarkMode ? darkMode : lightMode;

  const theme = createMuiTheme({
    palette: {
      type: palletType,
      ...currentTheme,
    },
  });

  const handleChange = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Header handleChange={handleChange} />
        <main>
          <Switch>
            <Route exact path={routes.home} component={HomePage} />
            <Route path={routes.country} component={CountryPage} />
          </Switch>
        </main>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Root;
