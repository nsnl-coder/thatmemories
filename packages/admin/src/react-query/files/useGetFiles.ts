import { useInfiniteQuery } from '@tanstack/react-query';
import { withDefaultOnError } from '../queryClient';

//
import axios from '@src/config/axios';
import { HttpError, HttpResponse } from '@src/types/http';
import { toastError } from '@src/utils/toast';

export type Response = HttpResponse<{
  IsTruncated: boolean;
  results: number;
  lastKey: number;
  keys: { Key: string }[];
}>;

const useGetFiles = (isOpen: boolean) => {
  const fetchPage = async ({ pageParam = undefined }) => {
    const { data } = await axios<Response>({
      method: 'get',
      url: '/api/files',
      params: {
        limit: 16,
        startAfter: pageParam,
      },
    });
    return data;
  };

  const onError = () => {
    toastError('Can not get files!');
  };

  const res = useInfiniteQuery<any, HttpError, Response>({
    queryFn: fetchPage,
    queryKey: ['files'],
    getNextPageParam: (lastPage: Response) =>
      lastPage.data!.IsTruncated ? lastPage.data?.lastKey : undefined,
    onError: withDefaultOnError(onError),
    enabled: isOpen,
  });

  return {
    s3Files: res.data,
    isLoading: res.isLoading,
    isError: res.isError,
    isFetching: res.isFetching,
    fetchNextPage: res.fetchNextPage,
    hasNextPage: res.hasNextPage,
  };
};

export default useGetFiles;
