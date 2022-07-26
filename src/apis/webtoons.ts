import Axios from './config';
import {
  Contents,
  DayOfWeek,
  Pageable,
  Platform,
  WebtoonItemResponseDTO,
} from './DTO/webtoons';

const generateRandom = (min = 1, max = 19) => {
  const difference = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand = rand + min;

  return rand;
};

export const getWebtoonsAPI = async (
  platfrom: Platform,
  dayOfWeek?: DayOfWeek,
  pageable: Pageable = {
    page: generateRandom(),
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
