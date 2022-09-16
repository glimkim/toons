import { useCallback } from 'react';
import { StoreState } from '@store/root';
import { addAlarmItemAPI, deleteAlarmItemAPI } from '@apis/alarms';
import { AddAlarmItemRequestDTO } from '@apis/DTO/alarms';
import { setAlert } from '@store/modules/alert';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { addToList, deleteFromList } from '@store/modules/alarms';
import { WebtoonItem } from '@hooks/useListState';

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

  const { mutateAsync: addAlarmItemAsync } = useMutation<
    { id: number },
    AxiosError,
    AddAlarmItemRequestDTO
  >(
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

  const onToggleItem = useCallback(
    (item: WebtoonItem, isActive: boolean, handleToggleView: () => void) => {
      if (token) {
        if (isActive) {
          deleteAlarmItemAsync(item.id).then(() => {
            handleToggleView();
            dispatch(deleteFromList(item.id));
          });
        } else {
          addAlarmItemAsync({
            webtoonId: item.id,
          }).then((res) => {
            handleToggleView();
            dispatch(addToList({ ...item, deletedAt: '', alarmId: res.id }));
          });
        }
      } else {
        dispatch(
          setAlert({
            alertType: 'WARNING',
            alertTitle: 'You need to Sign In',
            alertContents: '해당 기능은 로그인 후 사용하실 수 있습니다.',
          }),
        );
      }
    },
    [deleteAlarmItemAsync, addAlarmItemAsync, token],
  );

  return {
    addAlarmItemAsync,
    deleteAlarmItemAsync,
    onToggleItem,
  };
}

export default useAlarmMutation;
