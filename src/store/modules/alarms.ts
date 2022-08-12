import { AlarmItemResponseDTO, AlarmWebtoonDTO } from '@apis/DTO/alarms';

export type AlarmList = AlarmItemResponseDTO[];

type ActionType =
  | 'alarms/update'
  | 'alarms/reset'
  | 'alarms/add'
  | 'alarms/delete';

interface ActionObj {
  type: ActionType;
  newList?: AlarmList;
  newItem?: AlarmWebtoonDTO;
  webtoonId?: number;
}

export const updateList = (newList: AlarmList): ActionObj => {
  return {
    type: 'alarms/update',
    newList,
  };
};

export const resetList = (): ActionObj => {
  return {
    type: 'alarms/reset',
  };
};

export const addToList = (newItem: AlarmWebtoonDTO): ActionObj => {
  return {
    type: 'alarms/add',
    newItem: newItem,
  };
};

export const deleteFromList = (webtoonId: number): ActionObj => {
  return {
    type: 'alarms/delete',
    webtoonId,
  };
};

export default function alarms(state: AlarmList = [], action: ActionObj) {
  switch (action.type) {
    case 'alarms/update':
      return [...action.newList!];
    case 'alarms/reset':
      return [];
    case 'alarms/add':
      return state.concat({ webtoonDTO: action.newItem! });
    case 'alarms/delete':
      return state.filter((_item) => _item.webtoonDTO.id === action.webtoonId!);
    default:
      return state;
  }
}
``;
