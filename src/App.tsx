import React from 'react';
import { theme } from 'toons-components';
import GlobalStyles from '@styles/global';
import AppRouter from '@routes/AppRouter';
import { ThemeProvider } from 'styled-components';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
