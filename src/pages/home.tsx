import React, { useEffect } from 'react';
import MainBanner from '@components/home/MainBanner';
import useScroll from '@hooks/useScroll';

function Home() {
  return (
    <div style={{ height: '200vh', overflow: 'auto' }}>
      <MainBanner />
    </div>
  );
}

export default Home;
