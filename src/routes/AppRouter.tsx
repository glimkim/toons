import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Common from '../layout/common';
import AnimatedRoutes from './AnimatedRoutes';

function AppRouter() {
  return (
    <Router>
      <Common>
        <AnimatedRoutes />
      </Common>
    </Router>
  );
}

export default AppRouter;
