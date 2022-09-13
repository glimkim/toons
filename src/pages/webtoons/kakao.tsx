import DetailPageTemplate from '@components/common/DetailPageTemplate';
import PageLayout from '@layout/pageLayout';
import React from 'react';

function KakaoDetailPage() {
  return (
    <PageLayout pageTitle="Kakao toons">
      <DetailPageTemplate platform="KAKAO" />
    </PageLayout>
  );
}

export default KakaoDetailPage;
