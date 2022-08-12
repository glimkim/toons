import { Contents, WebtoonItemResponseDTO } from '@apis/DTO/webtoons';
import { getWebtoonsAPI } from '@apis/webtoons';
import { useQuery } from 'react-query';
export interface WebtoonItem extends WebtoonItemResponseDTO {
  toNotify: boolean;
}

function useWebtoonList() {
  const naverWebtoonsQuery = useQuery<Contents<WebtoonItemResponseDTO>>(
    ['naver-webtoon-list'],
    () => getWebtoonsAPI('NAVER'),
  );

  return { naverWebtoonsQuery };
}

export default useWebtoonList;
