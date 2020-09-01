import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export const useDarkMode = (): [Theme, () => void, boolean] => {
  const [theme, setTheme] = useState<Theme>('light');
  const [componentMounted, setComponentMounted] = useState(false);

  const setMode = (mode: Theme) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  useEffect(() => {
    // get theme from local storage
    const localTheme = window.localStorage.getItem('theme');
    // check user preferences: if user prefers dark mode and did not set mode in ls, by default render darkMode
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localTheme
      ? setMode('dark')
      : localTheme && localTheme === 'dark'
      ? setTheme('dark')
      : setMode('light');
    setComponentMounted(true);
  }, []);

  return [theme, toggleTheme, componentMounted];
};
