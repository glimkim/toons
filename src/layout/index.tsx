import Header from '@components/common/Header';
import AccountModal from '@components/home/AccountBox';
import useSearchParameters from '@hooks/useSearchParameters';
import { Alert as AlertType, unsetAlert } from '@store/modules/alert';
import { StoreState } from '@store/root';
import React, { useCallback, useEffect, useState } from 'react';
import { useIsFetching, useIsMutating } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, Loader, Alert } from 'toons-components';

interface LayoutProps {
  children: React.ReactNode;
}

function PageLayout({ children }: LayoutProps) {
  const { searchParams, queryParams, deleteSearchParams } =
    useSearchParameters('authType');
  const [openAuth, setOpenAuth] = useState(false);
  const isFetching = useIsFetching({});
  const isMutating = useIsMutating({
    predicate: (mutation) => {
      return !mutation.options.mutationKey?.includes('sign');
    },
  });
  const alert = useSelector<StoreState, AlertType>((state) => state.alert);
  const dispatch = useDispatch();

  const onCloseAlert = useCallback(() => {
    dispatch(unsetAlert());
  }, [unsetAlert]);

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
      <Alert {...alert} onCloseAlert={onCloseAlert} />
      <Header />
      <div className="contents">{children}</div>

      {isFetching + isMutating > 0 && <Loader isPartial={false} />}
      <Dialog open={openAuth} onClose={onCloseAuthBox}>
        <AccountModal />
      </Dialog>
    </>
  );
}

export default PageLayout;
