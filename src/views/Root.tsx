import React, { FC, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Header } from 'components/Header';
import { CountryProvider } from 'context/CountryContext';
import { routes } from 'routes';
import { lightMode, darkMode } from 'theme';
import { CountryPage } from 'views/CountryPage';
import { HomePage } from 'views/HomePage';

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
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header handleChange={handleChange} />
        <main>
          <Switch>
            <CountryProvider>
              <Route exact path={routes.home} component={HomePage} />
              <Route path={routes.country} component={CountryPage} />
            </CountryProvider>
          </Switch>
        </main>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default Root;
