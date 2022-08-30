import { StoreState } from '@store/root';
import { useMemo } from 'react';
import { WebtoonItem } from '@hooks/api/useWebtoonList';
import { WebtoonItemResponseDTO } from '@apis/DTO/webtoons';
import { useSelector } from 'react-redux';

function useListState(data: WebtoonItemResponseDTO[]): WebtoonItem[] {
  const alarms = useSelector((state: StoreState) => state.alarms);

  const listWithNotiInfo = useMemo(() => {
    return data
      ? data.map((_item) => ({
          ..._item,
          toNotify: alarms.some(
            (_alarm) => _alarm.webtoonDTO.name === _item.name,
          ),
        }))
      : [];
  }, [data, alarms]);

  return listWithNotiInfo;
}

export default useListState;
