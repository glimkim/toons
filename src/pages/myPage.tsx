import PageLayout from '@layout/pageLayout';
import { paddingUnderHeader } from '@styles/css';
import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

function MyPage() {
  return (
    <PageLayout>
      <Helmet title="Toons | My Page" />
      {/* <title>Toons | My Page</title>
      </Helmet> */}
      <MyPageContainer>my page</MyPageContainer>
    </PageLayout>
  );
}

const MyPageContainer = styled.div`
  ${paddingUnderHeader}
`;

export default MyPage;
