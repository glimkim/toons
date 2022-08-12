import Axios from './config';
import { AlarmItemResponseDTO, AddAlarmItemRequestDTO } from './DTO/alarms';

const getHeaders = (token: string) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getAlarmListAPI = async (token: string) => {
  return (
    await Axios.get<AlarmItemResponseDTO[]>('/api/alarms', {
      headers: getHeaders(token),
    })
  ).data;
};

export const addAlarmItemAPI = async (
  token: string,
  alarmItem: AddAlarmItemRequestDTO,
) => {
  return (
    await Axios.put('/api/alarms', alarmItem, {
      headers: getHeaders(token),
    })
  ).data;
};

export const deleteAlarmItemAPI = async (token: string, webtoonId: number) => {
  return (
    await Axios.delete(`/api/alarms/${webtoonId}`, {
      headers: getHeaders(token),
    })
  ).data;
};
