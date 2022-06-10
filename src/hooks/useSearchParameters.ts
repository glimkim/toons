import { useSearchParams } from 'react-router-dom';
import { useMemo, useCallback } from 'react';

function useSearchParameters(queryKey?: string) {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = useMemo(() => {
    return queryKey ? searchParams.getAll(queryKey) : [];
  }, [searchParams]);

  const appendSearchParams = useCallback(
    (param: { [key: string]: string }, replace = false) => {
      setSearchParams(param, {
        replace,
      });
    },
    [],
  );

  const deleteSearchParams = useCallback(
    (queryKey: string) => {
      searchParams.delete(queryKey);
      setSearchParams(searchParams);
    },
    [searchParams],
  );

  return {
    searchParams,
    queryParams,
    appendSearchParams,
    deleteSearchParams,
  };
}

export default useSearchParameters;
