import { AlarmItem } from '@apis/DTO/alarms';

export type AlarmList = AlarmItem[];

type ActionType = 'alarms/update' | 'alarms/reset';

interface ActionObj {
  type: ActionType;
  newList?: AlarmList;
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

export default function alarms(state: AlarmList = [], action: ActionObj) {
  switch (action.type) {
    case 'alarms/update':
      return [...action.newList!];
    case 'alarms/reset':
      return [];
    default:
      return state;
  }
}
