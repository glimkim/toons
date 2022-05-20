import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from 'toons-components';
import GlobalStyles from '@styles/global';
import MainBanner from '@components/home/MainBanner';
import Header from '@components/common/Header';
import AppRouter from '@routes/AppRouter';

function App() {
  // later make select-theme function
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
