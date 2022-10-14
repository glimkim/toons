import { Token } from '@apis/DTO/auth';
import Header from '@components/common/Header';
import AccountModal from '@components/common/AccountBox';
import useAlarms from '@hooks/api/useAlarms';
import useSearchParameters, { QueryKey } from '@hooks/useSearchParameters';
import useToken from '@hooks/useToken';
import { resetList, updateList } from '@store/modules/alarms';
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
import useUserInfo from '@hooks/api/useUserInfo';
import EditForm from '@components/my-page/EditUserInfoForm';

interface LayoutProps {
  children: React.ReactNode;
}

function Common({ children }: LayoutProps) {
  const { data: alarmList } = useAlarms();
  const { data: userInfo } = useUserInfo();
  const { alert, user } = useSelector((state: StoreState) => state);
  const dispatch = useDispatch();
  const { tokenFromLS, setTokenDue } = useToken();
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
  const { queryParams, deleteSearchParams } = useSearchParameters();
  const isFetching = useIsFetching({
    predicate: (query) => {
      return query.queryKey.includes('webtoon');
    },
  });
  const isMutating = useIsMutating({
    predicate: (mutation) => {
      return (
        !mutation.options.mutationKey?.includes('sign') &&
        !mutation.options.mutationKey?.includes('alarm')
      );
    },
  });
  const initialModalState = {
    open: false,
    component: '',
  };
  const [modal, setModal] = useState<{
    open: boolean;
    onCloseModal?: () => void;
    component: React.ReactNode;
  }>(initialModalState);

  useEffect(() => {
    setModal(() => {
      const currentParam: { [key in QueryKey]?: string } = queryParams[0];
      const onCloseModal = (queryKey: QueryKey) => {
        deleteSearchParams(queryKey);
        setModal(initialModalState);
      };

      if (currentParam) {
        if (currentParam?.authType && currentParam.authType.includes('sign')) {
          return {
            open: true,
            onCloseModal: () => onCloseModal('authType'),
            component: <AccountModal />,
          };
        } else if (currentParam?.userInfo && currentParam.userInfo === 'edit') {
          return {
            open: true,
            onCloseModal: () => onCloseModal('userInfo'),
            component: <EditForm />,
          };
        } else return initialModalState;
      } else return initialModalState;
    });
  }, [queryParams, deleteSearchParams, setModal]);

  const onCloseAlert = useCallback(() => {
    dispatch(unsetAlert());
  }, [unsetAlert]);

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
      dispatch(
        setUser({
          email: parsedToken.email,
          token: tokenFromLS,
          username: userInfo?.username,
          phoneNumber: userInfo?.phoneNumber,
        }),
      );
      setTokenDue(tokenFromLS);
      alarmList && dispatch(updateList(alarmList));
    } else {
      dispatch(unsetUser());
      dispatch(resetList());
      !!user?.tokenTimeout && clearTimeout(user.tokenTimeout);
    }
  }, [tokenFromLS, userInfo]);

  if (!fontsLoaded && isFetching > 0) return <Loader theme={'mix'} />;
  return (
    <>
      {isMutating > 0 && <Loader isPartial={false} />}
      <Header />
      {children}
      <Dialog open={modal.open} onClose={modal.onCloseModal}>
        {modal.component}
      </Dialog>
      <Alert {...alert} onCloseAlert={onCloseAlert} />
    </>
  );
}

export default Common;
