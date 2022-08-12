import DetailPageTemplate from '@components/common/DetailPageTemplate';
import PageLayout from '@layout/pageLayout';
import React from 'react';

function NaverDetailPage() {
  return (
    <PageLayout pageTitle="Naver toons">
      <DetailPageTemplate platform="NAVER">NAVER</DetailPageTemplate>
    </PageLayout>
  );
}

export default NaverDetailPage;
