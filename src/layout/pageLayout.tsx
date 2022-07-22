import Footer from '@components/common/Footer';
import React from 'react';
import styled from 'styled-components';

interface PageLayoutProps {
  children: React.ReactNode;
}

function PageLayout({ children }: PageLayoutProps) {
  return (
    <PageLayoutContainer>
      <div className="contents">{children}</div>
      <Footer />
    </PageLayoutContainer>
  );
}

const PageLayoutContainer = styled.div`
  width: 100%;
`;

export default PageLayout;
