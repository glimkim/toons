import React, { useCallback } from 'react';
import Header from '@components/common/Header';
import MainBanner from '@components/home/MainBanner';
import LoginBox from '@components/home/AccountBox';
import { useLocation, useParams } from 'react-router-dom';

function Home() {
  return (
    <div style={{ height: '200vh', overflow: 'auto' }}>
      <MainBanner />
    </div>
  );
}

export default Home;
