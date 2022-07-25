import { AlarmItem } from '@apis/DTO/alarms';

export type AlarmList = AlarmItem[];

type ActionType = 'alarmList/update';

interface ActionObj {
  type: ActionType;
  newList: AlarmList;
}

export const updateList = (newList: AlarmList): ActionObj => {
  return {
    type: 'alarmList/update',
    newList,
  };
};

export default function alarms(state: AlarmList = [], action: ActionObj) {
  switch (action.type) {
    case 'alarmList/update':
      return [...action.newList];
    default:
      return state;
  }
}
