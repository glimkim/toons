export interface Contents<T> {
  totalElements: number;
  totalPages: number;
  first: boolean;
  sort: Sort;
  size: number;
  content: T;
  number: number;
  numberOfElements: number;
  pageable: ContentsPageable;
  last: boolean;
  empty: boolean;
}

interface ContentsPageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface PageableParams {
  page: number;
  size: number;
  sort: string[];
}