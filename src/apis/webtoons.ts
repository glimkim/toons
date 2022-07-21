import Axios from './config';
import {
  Contents,
  DayOfWeek,
  Pageable,
  Platform,
  WebtoonItemResponseDTO,
} from './DTO/webtoons';

export const getWebtoonsAPI = async (
  platfrom: Platform,
  dayOfWeek?: DayOfWeek,
  pageable: Pageable = {
    page: 1,
    size: 30,
    sort: [],
  },
) => {
  return (
    await Axios.get<Contents<WebtoonItemResponseDTO>>(
      `/api/webtoons?platform=${platfrom}${
        dayOfWeek ? `&day-of-week=${dayOfWeek}` : ''
      }${pageable ? `&page=${pageable.page}&size=${pageable.size}` : ''}`,
    )
  ).data;
};
