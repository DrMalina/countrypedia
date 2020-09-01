import React, { FC } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Header } from 'components/Header';
import { ScrollTop } from 'components/ScrollTop';
import { CountryProvider } from 'context/CountryContext';
import { RegionsProvider } from 'context/RegionsContext';
import { useDarkMode } from 'hooks';
import { routes } from 'routes';
import { lightThemePallete, darkThemePallete } from 'theme';
import { CountryPage } from 'views/CountryPage';
import { HomePage } from 'views/HomePage';

const Root: FC = () => {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const currentPallete = theme === 'dark' ? darkThemePallete : lightThemePallete;

  const appTheme = createMuiTheme({
    palette: {
      type: theme,
      ...currentPallete,
    },
  });

  if (!componentMounted) {
    return <div />;
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Header currentTheme={theme} handleThemeChange={toggleTheme} />
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
