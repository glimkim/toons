import { Token } from '@apis/DTO/auth';
import Footer from '@components/common/Footer';
import Header from '@components/common/Header';
import AccountModal from '@components/home/AccountBox';
import useSearchParameters from '@hooks/useSearchParameters';
import useToken from '@hooks/useToken';
import { Alert as AlertType, unsetAlert } from '@store/modules/alert';
import { setUser } from '@store/modules/user';
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
import { useNavigate } from 'react-router-dom';
import { Dialog, Loader, Alert } from 'toons-components';

interface LayoutProps {
  children: React.ReactNode;
}

function PageLayout({ children }: LayoutProps) {
  const alert = useSelector<StoreState, AlertType>((state) => state.alert);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tokenFromLS, setTokenDue } = useToken();
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
  const { searchParams, queryParams, deleteSearchParams } =
    useSearchParameters('authType');
  const [openAuth, setOpenAuth] = useState(false);
  const isFetching = useIsFetching({});
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
      if (tokenFromLS === 'expired') {
        navigate('?authType=signIn');
      } else {
        const parsedToken = jwtDecode(tokenFromLS) as Token;
        dispatch(setUser({ email: parsedToken.email, token: tokenFromLS }));
        setTokenDue(tokenFromLS);
      }
    }
  }, [tokenFromLS]);

  if (!fontsLoaded) return <Loader theme={'mix'} />;
  return (
    <>
      <Alert {...alert} onCloseAlert={onCloseAlert} />
      {isFetching + isMutating > 0 && <Loader isPartial={false} />}
      <Header />
      <div className="contents">{children}</div>
      <Footer />
      <Dialog open={openAuth} onClose={onCloseAuthBox}>
        <AccountModal />
      </Dialog>
    </>
  );
}

export default PageLayout;
