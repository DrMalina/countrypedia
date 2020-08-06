const colors = {
  white: 'hsl(0, 0%, 100%)',
  gray: 'hsl(0, 0%, 98%)',
  gray100: 'hsl(0, 0%, 52%)',
  dark: 'hsl(209, 23%, 22%)',
  dark100: 'hsl(207, 26%, 17%)',
  dark200: 'hsl(200, 15%, 8%)',
};

export const lightMode = {
  primary: {
    main: colors.gray,
  },
  secondary: {
    main: colors.white,
  },
  input: {
    main: colors.gray100,
  },
  typography: {
    main: colors.dark200,
  },
};

export const darkMode = {
  primary: {
    main: colors.dark100,
  },
  secondary: {
    main: colors.dark,
  },
  input: {
    main: colors.gray100,
  },
  typography: {
    main: colors.white,
  },
};
