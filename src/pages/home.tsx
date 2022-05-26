import React from 'react';
import Header from '@components/common/Header';
import MainBanner from '@components/home/MainBanner';
import LoginBox from '@components/home/AccountBox';
import { useLocation } from 'react-router-dom';

function Home() {
  const { pathname } = useLocation();

  return (
    <div style={{ height: '200vh', backgroundColor: 'skyblue' }}>
      <MainBanner />
      {pathname === '/login' && <LoginBox />}
    </div>
  );
}

export default Home;
