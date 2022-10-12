import { WebtoonItem, WebtoonItemResponseDTO } from '@apis/DTO/webtoons';
import useAlarmMutation from '@hooks/api/useAlarmMutation';
import { StoreState } from '@store/root';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { List, ListItem } from 'toons-components';

interface WebtoonListProps {
  listId: string;
  data: WebtoonItemResponseDTO[];
}

function WebtoonList({ listId, data }: WebtoonListProps) {
  const alarms = useSelector((state: StoreState) => state.alarms);
  const { onToggleItem } = useAlarmMutation();

  const listData: WebtoonItem[] = useMemo(() => {
    return data
      ? data.map((_item) => {
          const alarmItem = alarms.find((_alarm) => _alarm.name === _item.name);
          return {
            ..._item,
            thumbnail:
              _item.platform === 'NAVER'
                ? _item.thumbnail
                : _item.thumbnail + '.webp',
            toNotify: !!alarmItem,
            alarmId: alarmItem?.alarmId,
          };
        })
      : [];
  }, [data, alarms]);

  return (
    <List id={listId}>
      {listData.map((_item) => (
        <ListItem
          key={_item.id}
          itemInfo={_item}
          onToggleItem={(isActive, handleToggleView) =>
            onToggleItem(_item, isActive, handleToggleView)
          }
        />
      ))}
    </List>
  );
}

export default WebtoonList;
