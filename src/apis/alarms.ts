import { getAPIHeaderWithAuth } from '@utils/getAPIHeaderWithAuth';
import Axios from './config';
import { AlarmItemResponseDTO, AddAlarmItemRequestDTO } from './DTO/alarms';

export const getAlarmListAPI = async (token: string) => {
  return (
    await Axios.get<AlarmItemResponseDTO[]>('/api/alarms', {
      headers: getAPIHeaderWithAuth(token),
    })
  ).data;
};

export const addAlarmItemAPI = async (
  token: string,
  alarmItem: AddAlarmItemRequestDTO,
) => {
  return (
    await Axios.put<AlarmItemResponseDTO>('/api/alarms', alarmItem, {
      headers: getAPIHeaderWithAuth(token),
    })
  ).data;
};

export const deleteAlarmItemAPI = async (token: string, alarmId: number) => {
  return (
    await Axios.delete(`/api/alarms/${alarmId}`, {
      headers: getAPIHeaderWithAuth(token),
    })
  ).data;
};
