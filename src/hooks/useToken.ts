import { setTokenTimeout } from './../store/modules/user';
import { useDispatch } from 'react-redux';
import { useCallback, useMemo } from 'react';
import { Token } from '@apis/DTO/auth';
import jwtDecode from 'jwt-decode';
import { unsetUser } from '@store/modules/user';

function useToken() {
  const tokenName = 'toons-token';
  const tokenFromLS = useMemo(() => {
    return window.localStorage.getItem(tokenName);
  }, [window.localStorage.getItem(tokenName)]);
  const dispatch = useDispatch();

  const removeToken = () => {
    window.localStorage.removeItem(tokenName);
    dispatch(unsetUser());
  };

  const setTokenDue = useCallback((token: string) => {
    const tokenDue =
      (jwtDecode(token) as Token).exp * 1000 - new Date().getTime();

    const tokenTimeout: NodeJS.Timeout = setTimeout(() => {
      removeToken();
    }, tokenDue);

    dispatch(setTokenTimeout(tokenTimeout));
  }, []);

  const setToken = (tokenResult: string) => {
    window.localStorage.setItem(tokenName, tokenResult);
  };

  return { tokenFromLS, removeToken, setToken, setTokenDue };
}

export default useToken;
