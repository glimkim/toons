import React from 'react';
import { Button, ToonsThemeProvider } from 'toons-components';
import GloablStyles from './assets/styles/gloabl';

function App() {
  return (
    <ToonsThemeProvider themeType='DEFAULT'>
      <GloablStyles />
      <div>
        <Button>BUTTON</Button>
      </div>
    </ToonsThemeProvider>
  );
}

export default App;
