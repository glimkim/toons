import Header from '@components/common/Header';
import AccountModal from '@components/home/AccountBox';
import useSearchParameters from '@hooks/useSearchParameters';
import React, { useCallback, useEffect, useState } from 'react';
import { Dialog } from 'toons-components';

interface LayoutProps {
  children: React.ReactNode;
}

function PageLayout({ children }: LayoutProps) {
  const { searchParams, queryParams, deleteSearchParams } =
    useSearchParameters('authType');
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
        <AccountModal />
      </Dialog>
    </>
  );
}

export default PageLayout;
