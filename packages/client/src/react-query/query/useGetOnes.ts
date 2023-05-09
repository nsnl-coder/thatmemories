import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';
import { withDefaultOnError } from '../queryClient';
import { RequestConfig } from '../queryConfig';

//
import axios from '@src/config/axios';
import { HttpError, HttpResponse } from '@src/types/http';
import { toastError } from '@src/utils/toast';

interface Options {
  includeUrlQuery: boolean;
  additionalQuery: AddtionalQuery;
}

interface AddtionalQuery {
  fields?: string;
  sort?: string;
  page?: number;
  itemsPerPage?: 5 | 10 | 20 | 50 | 100 | 200 | 500 | 1000;
  [key: string]: any;
  startAfter?: string;
  prefix?: string;
  key?: string;
}

const useGetOnes = <T>(
  requestConfig: RequestConfig,
  options: Options = { includeUrlQuery: false, additionalQuery: {} },
  enabled: boolean = true,
) => {
  const queryClient = useQueryClient();
  const { query } = useRouter();
  const { includeUrlQuery, additionalQuery } = options;

  const finalQuery = useMemo(
    () =>
      includeUrlQuery ? { ...query, ...additionalQuery } : additionalQuery,
    [includeUrlQuery, query, additionalQuery],
  );

  const queryFn = useCallback(async () => {
    const { data } = await axios<HttpResponse<T>>({
      method: 'get',
      url: requestConfig.url,
      params: finalQuery,
    });
    return data;
  }, [finalQuery, requestConfig.url]);

  const onError = () => {
    toastError(`Can not get ${requestConfig.pluralName}`);
  };

  const res = useQuery<any, HttpError, HttpResponse<T>>({
    queryKey: [requestConfig.pluralName, finalQuery],
    queryFn,
    onError: withDefaultOnError(onError),
    keepPreviousData: true,
    enabled,
  });

  useEffect(() => {
    let currentPage = query.page;
    if (!currentPage) return;

    let totalPages = res.data?.pagination?.totalPages;
    if (!totalPages) return;

    if (Number(currentPage) > 0 && Number(currentPage) < totalPages) {
      const nextQuery = {
        ...query,
        page: (Number(currentPage) + 1).toString(),
      };

      queryClient.prefetchQuery({
        queryKey: [requestConfig.pluralName, nextQuery],
        queryFn,
      });
    }
  }, [
    query.page,
    query,
    queryClient,
    queryFn,
    requestConfig.pluralName,
    res.data?.pagination?.totalPages,
  ]);

  return {
    data: res.data?.data,
    pagination: res.data?.pagination,
    isLoading: res.isLoading,
    isError: res.isError,
    error: res.error,
  };
};

export default useGetOnes;
