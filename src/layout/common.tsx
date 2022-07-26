import { Token } from '@apis/DTO/auth';
import Header from '@components/common/Header';
import AccountModal from '@components/home/AccountBox';
import useAlarms from '@hooks/api/useAlarms';
import useSearchParameters from '@hooks/useSearchParameters';
import useToken from '@hooks/useToken';
import { updateList } from '@store/modules/alarms';
import { unsetAlert } from '@store/modules/alert';
import { setUser, unsetUser } from '@store/modules/user';
import { StoreState } from '@store/root';
import jwtDecode from 'jwt-decode';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { useIsFetching, useIsMutating } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, Loader, Alert } from 'toons-components';

interface LayoutProps {
  children: React.ReactNode;
}

function Common({ children }: LayoutProps) {
  const { data: alarmList } = useAlarms();
  const { alert, user } = useSelector((state: StoreState) => state);
  const dispatch = useDispatch();
  const { tokenFromLS, setTokenDue } = useToken();
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
  const { searchParams, queryParams, deleteSearchParams } =
    useSearchParameters('authType');
  const [openAuth, setOpenAuth] = useState(false);
  const isFetching = useIsFetching({
    predicate: (query) => {
      return query.queryKey.includes('webtoon');
    },
  });
  const isMutating = useIsMutating({
    predicate: (mutation) => {
      return !mutation.options.mutationKey?.includes('sign');
    },
  });

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

  useLayoutEffect(() => {
    (document as Document).fonts.ready
      .then((res) => {
        res.status === 'loaded' && setFontsLoaded(true);
      })
      .catch(() => {
        setTimeout(() => {
          setFontsLoaded(true);
        }, 3000);
      });

    return () => {
      setFontsLoaded(false);
    };
  }, []);

  useEffect(() => {
    if (!!tokenFromLS) {
      const parsedToken = jwtDecode(tokenFromLS) as Token;
      dispatch(setUser({ email: parsedToken.email, token: tokenFromLS }));
      setTokenDue(tokenFromLS);
      alarmList && dispatch(updateList(alarmList));
    } else if (!!user?.tokenTimeout) {
      dispatch(unsetUser());
      clearTimeout(user.tokenTimeout);
    }
  }, [tokenFromLS]);

  if (!fontsLoaded && isFetching > 0) return <Loader theme={'mix'} />;
  return (
    <>
      <Alert {...alert} onCloseAlert={onCloseAlert} />
      {isMutating > 0 && <Loader isPartial={false} />}
      <Header />
      {children}
      <Dialog open={openAuth} onClose={onCloseAuthBox}>
        <AccountModal />
      </Dialog>
    </>
  );
}

export default Common;
