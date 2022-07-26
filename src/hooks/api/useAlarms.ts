import { queryClient } from '../../App';
import { StoreState } from '@store/root';
import { useDispatch, useSelector } from 'react-redux';
import { updateList } from '@store/modules/alarms';
import { useMutation, useQuery } from 'react-query';
import {
  getAlarmListAPI,
  addAlarmItemAPI,
  deleteAlarmItemAPI,
} from '@apis/alarms';
import { AddAlarmItemRequestDTO } from '@apis/DTO/alarms';
import _ from 'lodash';

function useAlarms() {
  const listQueryKey = 'alarm-list';
  const dispatch = useDispatch();
  const {
    user: { token },
    alarms,
  } = useSelector((state: StoreState) => state);

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

  const { mutateAsync: addAlarmItemAsync } = useMutation(
    'add-to-alarms',
    (newItem: AddAlarmItemRequestDTO) => addAlarmItemAPI(token!, newItem),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(listQueryKey);
      },
      onError: (err) => console.log(err),
    },
  );

  const { mutateAsync: deleteAlarmItemAsync } = useMutation(
    'delete-to-alarms',
    (webtoonId: number) => deleteAlarmItemAPI(token!, webtoonId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(listQueryKey);
      },
      onError: (err) => console.log(err),
    },
  );

  return {
    data,
    addAlarmItemAsync,
    deleteAlarmItemAsync,
  };
}

export default useAlarms;
