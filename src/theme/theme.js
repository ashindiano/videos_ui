import { createTheme, colors } from '@mui/material';

const theme = createTheme({
  shape: {
    borderRadius: 0,
  },
  palette: {
    background: {
      dark: '#F4F6F8',
      default: colors.common.white,
      paper: colors.common.white,
    },
    success: {
      main: '#388e3c',
    },
    primary: {
      main: '#06abab',
    },
    secondary: {
      main: '#9a0036',
    },
    shade: {
      main: '#90a4ae',
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {},
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        input: {
          borderRadius: 0,
        },
        inputRoot: {
          borderRadius: 0,
        },
      },
    },
  },
});

export default theme;
