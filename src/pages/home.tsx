import React from 'react';
import MainBanner from '@components/home/MainBanner';
import WebtoonList from '@components/home/WebtoonList';
import styled from 'styled-components';
import { paddingUnderHeader } from '@styles/css';
import PageLayout from '@layout/pageLayout';

function Home() {
  return (
    <PageLayout pageTitle="Home">
      <MainBanner />
      <MainContentsWrapper className="wrapper">
        <WebtoonList />
      </MainContentsWrapper>
    </PageLayout>
  );
}

const MainContentsWrapper = styled.div`
  ${paddingUnderHeader};
`;

export default Home;
