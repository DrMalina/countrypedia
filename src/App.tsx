import React, { FC, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { ScrollTop } from './components/ScrollTop';
import { lightMode, darkMode } from './theme';

const App: FC = () => {
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
      <CssBaseline />
      <Header handleChange={handleChange} />
      <main>
        <Dashboard />
        <ScrollTop>
          <Fab color="secondary" size="medium" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </main>
    </ThemeProvider>
  );
};

export default App;
