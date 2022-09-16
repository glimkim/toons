import { StoreState } from '@store/root';
import { useMemo } from 'react';
import { WebtoonItemResponseDTO } from '@apis/DTO/webtoons';
import { useSelector } from 'react-redux';

export interface WebtoonItem extends WebtoonItemResponseDTO {
  toNotify: boolean;
  alarmId?: number;
}

function useListState(data: WebtoonItemResponseDTO[]): WebtoonItem[] {
  const alarms = useSelector((state: StoreState) => state.alarms);

  const listWithNotiInfo = useMemo(() => {
    return data
      ? data.map((_item) => {
          const alarmItem = alarms.find((_alarm) => _alarm.name === _item.name);
          return {
            ..._item,
            toNotify: !!alarmItem,
            alarmId: alarmItem?.alarmId,
          };
        })
      : [];
  }, [data, alarms]);

  return listWithNotiInfo;
}

export default useListState;
