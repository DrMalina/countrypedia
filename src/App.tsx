import React, { FC, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
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
      </main>
    </ThemeProvider>
  );
};

export default App;
