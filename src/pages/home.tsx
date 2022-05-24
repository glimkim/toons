import React from 'react';
import Header from '@components/common/Header';
import LoginBox from '@components/home/LoginBox';
import { useLocation } from 'react-router-dom';

function Home() {
  const { pathname } = useLocation();

  return (
    <div style={{ height: '200vh', backgroundColor: 'skyblue' }}>
      <Header />
      {pathname === '/login' && <LoginBox />}
    </div>
  );
}

export default Home;
