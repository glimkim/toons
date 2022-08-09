import PageLayout from '@layout/pageLayout';
import { paddingUnderHeader } from '@styles/css';
import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { TabBar } from 'toons-components';

function MyPage() {
  const tabs = [
    {
      title: 'ALL',
      contents: <div>contents here</div>,
    },
    {
      title: 'NAVER',
      contents: <div>contents here</div>,
    },
    {
      title: 'KAKAO',
      contents: <div>contents here</div>,
    },
  ];
  return (
    <PageLayout>
      <Helmet title="Toons | My Page" />
      <MyPageContainer>
        <div className="wrapper">
          <TabBar headTitle="Your Notification" tabs={tabs} />
        </div>
      </MyPageContainer>
    </PageLayout>
  );
}

const MyPageContainer = styled.div`
  ${paddingUnderHeader};
  div.wrapper {
    padding: 3rem 0;
  }
  background-color: ${({ theme: { colors } }) => colors.main};
`;

export default MyPage;
