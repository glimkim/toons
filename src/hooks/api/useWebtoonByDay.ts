import { Platform } from '@apis/DTO/webtoons';
import { getWebtoonsAPI } from '@apis/webtoons';
import { DayOfWeek } from './../../apis/DTO/webtoons';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { StoreState } from '@store/root';

function useWebtoonsByDay(platform: Platform, dayOfWeek: DayOfWeek) {
  const { alarms: alarmList } = useSelector((state: StoreState) => state);

  const webtoonsByDayQuery = useQuery(
    [`${dayOfWeek}-list`, alarmList],
    () => getWebtoonsAPI(platform, dayOfWeek),
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

  return { webtoonsByDayQuery };
}

export default useWebtoonsByDay;
