import React from 'react';
import MainBanner from '@components/home/MainBanner';
import WebtoonListSection from '@components/home/WebtoonListSection';
import styled from 'styled-components';
import PageLayout from '@layout/pageLayout';

function Home() {
  return (
    <PageLayout pageTitle="Home">
      <MainBanner />
      <MainContentsWrapper className="wrapper">
        <WebtoonListSection />
      </MainContentsWrapper>
    </PageLayout>
  );
}

const MainContentsWrapper = styled.div``;

export default Home;
