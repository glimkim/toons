import React from 'react';
import { ToonsThemeProvider } from 'toons-components';
import GlobalStyles from './assets/styles/global';
import MainBanner from './components/home/MainBanner';

function App() {
  return (
    <ToonsThemeProvider themeType="DEFAULT">
      <GlobalStyles />
      <div style={{ height: '200vh', backgroundColor: 'skyblue' }}>
        <MainBanner />
      </div>
    </ToonsThemeProvider>
  );
}

export default App;
