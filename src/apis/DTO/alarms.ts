import { WebtoonItemResponseDTO } from './webtoons';

export interface AlarmItemResponseDTO {
  id: number;
  webtoonDTO: AlarmWebtoonDTO;
}

export interface AlarmWebtoonDTO extends WebtoonItemResponseDTO {
  deletedAt: string | Date;
}

export interface AddAlarmItemRequestDTO {
  webtoonId: number;
}
