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
      {children}
    </PageTemplateContainer>
  );
}

const PageTemplateContainer = styled.div<{ platform: Platform }>`
  ${paddingUnderHeader};
  background-color: ${({ platform }) =>
    platform === 'NAVER' ? 'pink' : 'skyblue'};
  height: 100vh;
  font-size: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

export default DetailPageTemplate;
