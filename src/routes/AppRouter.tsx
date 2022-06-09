import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@pages/home';
import PageLayout from '../layout';

function AppRouter() {
  return (
    <Router>
      <PageLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Home />} />
          <Route path="/auth/:authType" element={<Home />} />
        </Routes>
      </PageLayout>
    </Router>
  );
}

export default AppRouter;
