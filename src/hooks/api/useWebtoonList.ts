import { Contents, WebtoonItemResponseDTO } from '@apis/DTO/webtoons';
import { getWebtoonsAPI } from '@apis/webtoons';
import { useQuery, useMutation } from 'react-query';
import { StoreState } from '@store/root';
import { useSelector } from 'react-redux';

export interface WebtoonItem extends WebtoonItemResponseDTO {
  toNotify: boolean;
}

function useWebtoonList() {
  const { alarms } = useSelector((state: StoreState) => state);

  const naverWebtoonsQuery = useQuery<
    Contents<WebtoonItemResponseDTO>,
    unknown,
    WebtoonItem[]
  >(['naver-webtoon-list', alarms], () => getWebtoonsAPI('NAVER'), {
    select: (res) => {
      return res.content.map((item) =>
        alarms.some((_item) => _item.webtoonName === item.name)
          ? {
              ...item,
              toNotify: true,
            }
          : {
              ...item,
              toNotify: false,
            },
      );
    },
  });

  return { naverWebtoonsQuery };
}

export default useWebtoonList;
