import React from 'react';
import MainBanner from '@components/home/MainBanner';
import WebtoonList from '@components/home/WebtoonList';
import styled from 'styled-components';
import { paddingUnderHeader } from '@styles/css';

function Home() {
  return (
    <div style={{ height: '200vh', overflow: 'auto' }}>
      <MainBanner />
      <MainContentsWrapper className="wrapper">
        <WebtoonList />
      </MainContentsWrapper>
    </div>
  );
}

const MainContentsWrapper = styled.div`
  ${paddingUnderHeader};
`;

export default Home;
