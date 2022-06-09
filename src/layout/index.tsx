import Header from '@components/common/Header';
import LoginBox from '@components/home/AccountBox';
import useQueryParameters from '@hooks/useQueryParameters';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Dialog } from 'toons-components';

interface LayoutProps {
  children: React.ReactNode;
}

function PageLayout({ children }: LayoutProps) {
  const { searchParams, queryParams, deleteSearchParams } =
    useQueryParameters('authType');
  const [openAuth, setOpenAuth] = useState(false);

  const onCloseAuthBox = useCallback(() => {
    setOpenAuth(false);
    deleteSearchParams('authType');
  }, [searchParams]);

  useEffect(() => {
    ['signIn', 'signUp'].includes(queryParams[0])
      ? setOpenAuth(true)
      : setOpenAuth(false);
  }, [queryParams]);

  return (
    <>
      <Header />
      <div className="contents">{children}</div>
      <Dialog open={openAuth} onClose={onCloseAuthBox}>
        <LoginBox />
      </Dialog>
    </>
  );
}

export default PageLayout;
