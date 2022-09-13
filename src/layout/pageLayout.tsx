import Footer from '@components/common/Footer';
import React from 'react';
import { Helmet } from 'react-helmet-async';

import styled from 'styled-components';

interface PageLayoutProps {
  pageTitle: string;
  children: React.ReactNode;
}

function PageLayout({ pageTitle, children }: PageLayoutProps) {
  return (
    <PageLayoutContainer>
      <Helmet>
        <title>Toons | {pageTitle}</title>
      </Helmet>
      <div className="contents">{children}</div>
      <Footer />
    </PageLayoutContainer>
  );
}

const PageLayoutContainer = styled.div`
  width: 100%;
  background-color: #fff;
`;

export default PageLayout;
