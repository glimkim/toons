import { Platform } from '@apis/DTO/webtoons';
import { getWebtoonsAPI } from '@apis/webtoons';
import { DayOfWeek } from './../../apis/DTO/webtoons';
import { useQuery } from 'react-query';
import { useState, useMemo } from 'react';

function useWebtoonsByDay(platform: Platform) {
  const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek>('MONDAY');
  const selectedPlatform = useMemo(() => {
    return platform;
  }, [platform]);

  const webtoonsByDayQuery = useQuery([`${platform}-${dayOfWeek}-list`], () =>
    getWebtoonsAPI(selectedPlatform, dayOfWeek),
  );

  return { webtoonsByDayQuery, setDayOfWeek, dayOfWeek };
}

export default useWebtoonsByDay;
