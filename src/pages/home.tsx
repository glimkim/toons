import React, { useCallback } from 'react';
import MainBanner from '@components/home/MainBanner';

function Home() {
  return (
    <div style={{ height: '200vh', overflow: 'auto' }}>
      <MainBanner />
    </div>
  );
}

export default Home;
