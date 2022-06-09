import { useSearchParams } from 'react-router-dom';
import { useMemo, useCallback } from 'react';

function useQueryParameters(queryKey?: string) {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = useMemo(() => {
    return queryKey ? searchParams.getAll(queryKey) : [];
  }, [searchParams]);

  const appendSearchParams = useCallback((param: { [key: string]: string }) => {
    setSearchParams(param);
  }, []);

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

export default useQueryParameters;
