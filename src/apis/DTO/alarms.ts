import { WebtoonItemResponseDTO } from './webtoons';

export interface AlarmItemResponseDTO {
  webtoonDTO: AlarmWebtoonDTO;
}

export interface AlarmWebtoonDTO extends WebtoonItemResponseDTO {
  deletedAt: string | Date;
}

export interface AddAlarmItemRequestDTO {
  webtoonId: number;
}
