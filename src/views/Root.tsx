import React, { FC, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Header } from 'components/Header';
import { ScrollTop } from 'components/ScrollTop';
import { CountryProvider } from 'context/CountryContext';
import { RegionsProvider } from 'context/RegionsContext';
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
        <main style={{ maxWidth: '100vw', overflow: 'hidden', paddingBottom: '10rem' }}>
          <CountryProvider>
            <RegionsProvider>
              <Switch>
                <Route exact path={routes.home} component={HomePage} />
                <Route path={routes.country} component={CountryPage} />
              </Switch>
            </RegionsProvider>
          </CountryProvider>
        </main>
        <ScrollTop />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default Root;
