import { Platform } from '@apis/DTO/webtoons';
import { getWebtoonsAPI } from '@apis/webtoons';
import { DayOfWeek } from './../../apis/DTO/webtoons';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { StoreState } from '@store/root';
import { useState, useMemo } from 'react';

function useWebtoonsByDay(platform: Platform) {
  const { alarms: alarmList } = useSelector((state: StoreState) => state);
  const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek>('MONDAY');
  const selectedPlatform = useMemo(() => {
    return platform;
  }, [platform]);

  const webtoonsByDayQuery = useQuery(
    [`${dayOfWeek}-list`, alarmList],
    () => getWebtoonsAPI(selectedPlatform, dayOfWeek),
    {
      select: (res) => {
        return res.content.map((item) =>
          alarmList.some(({ webtoonDTO: _item }) => _item.name === item.name)
            ? {
                ...item,
                toNotify: true,
              }
            : {
                ...item,
                toNotify: false,
              },
        );
      },
    },
  );

  return { webtoonsByDayQuery, setDayOfWeek, dayOfWeek };
}

export default useWebtoonsByDay;
