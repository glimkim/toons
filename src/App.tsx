import React from 'react';
import { Button, ToonsThemeProvider } from 'toons-components';
import GloablStyles from './styles/gloabl';

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
