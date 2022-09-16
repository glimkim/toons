import { AlarmWebtoonDTO, AlarmItemResponseDTO } from './../../apis/DTO/alarms';
import { StoreState } from '@store/root';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { updateList } from '@store/modules/alarms';
import { useQuery } from 'react-query';
import { getAlarmListAPI } from '@apis/alarms';

export const alarmListQuqeryKey = 'alarm-list';

export interface AlarmItem extends AlarmWebtoonDTO {
  alarmId: number;
}

function useAlarms() {
  const dispatch = useDispatch();
  const {
    user: { token },
    alarms,
  } = useSelector((state: StoreState) => state, shallowEqual);

  const { data } = useQuery<AlarmItemResponseDTO[], unknown, AlarmItem[]>(
    ['alarm-list', token],
    () => getAlarmListAPI(token!),
    {
      enabled: !!token,
      select: (res) => {
        const alarmList = res.map(({ id, webtoonDTO }) => ({
          ...webtoonDTO,
          thumbnail:
            webtoonDTO.platform === 'NAVER'
              ? webtoonDTO.thumbnail
              : webtoonDTO.thumbnail + '.webp',
          alarmId: id,
        }));
        alarms.length === 0 && dispatch(updateList(alarmList));
        return alarmList;
      },
      onError: (err) => console.log(err),
    },
  );

  return {
    data,
  };
}

export default useAlarms;
