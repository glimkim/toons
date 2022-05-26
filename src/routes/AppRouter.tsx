import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@pages/home';
import { useTheme } from 'styled-components';

function AppRouter() {
  const theme = useTheme();
  console.log(theme);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
