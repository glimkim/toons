import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from 'toons-components';
import GlobalStyles from './styles/global';
import MainBanner from './components/home/MainBanner';

function App() {
  // later make select-theme function
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div style={{ height: '200vh', backgroundColor: 'skyblue' }}>
        <MainBanner />
      </div>
    </ThemeProvider>
  );
}

export default App;
