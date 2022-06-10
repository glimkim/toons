import React from 'react';
import { theme } from 'toons-components';
import GlobalStyles from '@styles/global';
import AppRouter from '@routes/AppRouter';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {},
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AppRouter />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
