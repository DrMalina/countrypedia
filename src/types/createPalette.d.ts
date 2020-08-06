import * as createPalette from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    typography: PaletteColorOptions;
    input: PaletteColorOptions;
  }
}
