import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { useRoutes } from 'react-router';
import routesConfig from './routes';
import theme from './theme/theme';

const App = function () {
  const routes = useRoutes(routesConfig);
  return <ThemeProvider theme={theme}>{routes}</ThemeProvider>;
};

export default App;
