import Axios from './config';
import {
  Contents,
  DayOfWeek,
  Platform,
  WebtoonItemResponseDTO,
} from './DTO/webtoons';

export const getWebtoonsAPI = async (
  platfrom: Platform,
  dayOfWeek?: DayOfWeek,
) => {
  return (
    await Axios.get<Contents<WebtoonItemResponseDTO>>(
      `/api/webtoons?platform=${platfrom}${
        dayOfWeek ? `&day-of-week=${dayOfWeek}` : ''
      }`,
    )
  ).data;
};
