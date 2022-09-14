import { StoreState } from '@store/root';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { updateList } from '@store/modules/alarms';
import { useQuery } from 'react-query';
import { getAlarmListAPI } from '@apis/alarms';

export const alarmListQuqeryKey = 'alarm-list';

function useAlarms() {
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
      select: (res) => {
        const alarmList = res.map((_alarm) =>
          _alarm.webtoonDTO.platform === 'NAVER'
            ? _alarm.webtoonDTO
            : {
                ..._alarm.webtoonDTO,
                thumbnail: _alarm.webtoonDTO.thumbnail + '.webp',
              },
        );
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
