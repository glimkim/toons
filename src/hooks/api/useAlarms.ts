import { setAlert } from '@store/modules/alert';
import { queryClient } from '../../App';
import { StoreState } from '@store/root';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { updateList } from '@store/modules/alarms';
import { useMutation, useQuery } from 'react-query';
import {
  getAlarmListAPI,
  addAlarmItemAPI,
  deleteAlarmItemAPI,
} from '@apis/alarms';
import { AddAlarmItemRequestDTO } from '@apis/DTO/alarms';
import { AxiosError } from 'axios';

function useAlarms() {
  const listQueryKey = 'alarm-list';
  const dispatch = useDispatch();
  const {
    user: { token },
    alarms,
  } = useSelector((state: StoreState) => state, shallowEqual);

  const { data } = useQuery(
    ['alarm-list', token],
    () => getAlarmListAPI(token!),
    {
      enabled: !!token,
      onSuccess: (res) => {
        alarms.length === 0 && dispatch(updateList(res));
      },
      onError: (err) => console.log(err),
    },
  );

  const authCheckOnError = (err: AxiosError) => {
    if (err.response?.status === 401) {
      dispatch(
        setAlert({
          alertType: 'WARNING',
          alertTitle: 'You need to Sign In',
          alertContents: '해당 기능은 로그인 후 사용하실 수 있습니다.',
        }),
      );
    }
  };

  const { mutateAsync: addAlarmItemAsync } = useMutation(
    'add-to-alarms',
    (newItem: AddAlarmItemRequestDTO) => addAlarmItemAPI(token!, newItem),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(listQueryKey);
      },
      onError: authCheckOnError,
    },
  );

  const { mutateAsync: deleteAlarmItemAsync } = useMutation(
    'delete-to-alarms',
    (webtoonId: number) => deleteAlarmItemAPI(token!, webtoonId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(listQueryKey);
      },
      onError: authCheckOnError,
    },
  );

  return {
    data,
    addAlarmItemAsync,
    deleteAlarmItemAsync,
  };
}

export default useAlarms;
