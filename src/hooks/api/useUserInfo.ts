import { StoreState } from '@store/root';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { getUserInfoAPI } from '@apis/auth';

function useUserInfo() {
  const { token } = useSelector((state: StoreState) => state.user);

  const userInfoQuery = useQuery(
    ['user-info', token],
    () => getUserInfoAPI(token!),
    {
      enabled: !!token,
    },
  );

  return userInfoQuery;
}

export default useUserInfo;
