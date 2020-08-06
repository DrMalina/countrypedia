import React, { FC, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { Header } from './components/Header/Header';
import { lightMode, darkMode } from './theme/mainTheme';

const App: FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const palletType = isDarkMode ? 'dark' : 'light';
  const theme = isDarkMode ? darkMode : lightMode;

  const currentTheme = createMuiTheme({
    palette: {
      type: palletType,
      ...theme,
    },
  });

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Header />
    </ThemeProvider>
  );
};

export default App;
