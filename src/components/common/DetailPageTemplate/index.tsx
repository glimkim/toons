import { Platform } from '@apis/DTO/webtoons';
import { paddingUnderHeader } from '@styles/css';
import React from 'react';
import styled from 'styled-components';

interface PageTemplateProps {
  platform: Platform;
  children: React.ReactNode;
}

function DetailPageTemplate({ children, platform }: PageTemplateProps) {
  return (
    <PageTemplateContainer platform={platform}>
      <div className="pageHead wrapper">
        <h3>{platform === 'NAVER' ? '네이버' : '카카오'}</h3>
        {children}
      </div>
    </PageTemplateContainer>
  );
}

const PageTemplateContainer = styled.div<{ platform: Platform }>`
  ${paddingUnderHeader};
  background-color: #fff;
  div.pageHead {
    padding-top: 5rem;
    padding-bottom: 3rem;
    h3 {
      font-family: 'Black Han Sans';
      font-size: 2rem;
      margin-bottom: 1rem;
    }
  }
  div.loader {
    padding: 3rem 0;
  }
`;

export default DetailPageTemplate;
