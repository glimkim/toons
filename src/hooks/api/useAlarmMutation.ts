import { StoreState } from '@store/root';
import { addAlarmItemAPI, deleteAlarmItemAPI } from '@apis/alarms';
import { AddAlarmItemRequestDTO } from '@apis/DTO/alarms';
import { setAlert } from '@store/modules/alert';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

function useAlarmMutation() {
  const { token } = useSelector((state: StoreState) => state.user);
  const dispatch = useDispatch();

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
      onError: authCheckOnError,
    },
  );

  const { mutateAsync: deleteAlarmItemAsync } = useMutation(
    'delete-to-alarms',
    (webtoonId: number) => deleteAlarmItemAPI(token!, webtoonId),
    {
      onError: authCheckOnError,
    },
  );

  return {
    addAlarmItemAsync,
    deleteAlarmItemAsync,
  };
}

export default useAlarmMutation;