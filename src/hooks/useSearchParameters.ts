import { useSearchParams } from 'react-router-dom';
import { useMemo, useCallback, useEffect, useState } from 'react';

export type QueryKey = 'authType' | 'userInfo';

function useSearchParameters(queryKey?: string) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allParams, setAllParams] = useState<{ [key in QueryKey]?: string }[]>(
    [],
  );

  useEffect(() => {
    const paramEntries = Array.from(searchParams.entries());
    setAllParams(() =>
      paramEntries.length > 0
        ? paramEntries.map((_paramArr) => ({
            [_paramArr[0]]: _paramArr[1],
          }))
        : [],
    );
  }, [searchParams, setAllParams]);

  const queryParams = useMemo(() => {
    return queryKey
      ? allParams.filter((_param) => !!_param[queryKey as QueryKey])
      : allParams;
  }, [allParams, queryKey]);

  const appendSearchParams = useCallback(
    (param: { [key in QueryKey]?: string }, replace = false) => {
      setSearchParams(param, {
        replace,
      });
    },
    [setSearchParams],
  );

  const deleteSearchParams = useCallback(
    (queryKey: QueryKey) => {
      searchParams.delete(queryKey);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  return {
    searchParams,
    queryParams,
    appendSearchParams,
    deleteSearchParams,
  };
}

export default useSearchParameters;
