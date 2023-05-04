import useGetOnes from '@src/react-query/query/useGetOnes';
import queryConfig from '@src/react-query/queryConfig';
import { IProduct } from '@src/yup/productSchema';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Props {
  enabled: boolean;
}

const useRecentViewedProducts = () => {
  const router = useRouter();
  const [ids, setIds] = useState<string[]>([]);
  const enabled = ids && ids.length > 0;
  const key = 'recent_product_views';

  const { data: recentViewedProducts, isLoading } = useGetOnes<IProduct[]>(
    queryConfig.products,
    {
      includeUrlQuery: false,
      additionalQuery: {
        _id: ids,
        fields: 'name slug previewImages price discountPrice',
      },
    },
    enabled,
  );

  const currentSlug = router.query.slug;

  useEffect(() => {
    if (typeof currentSlug === 'string' && currentSlug.length >= 24) {
      setIds((prev) => {
        const currentId = currentSlug.split('-').at(-1) as string;
        const index = prev.findIndex((id) => id === currentId);

        if (index === -1 && currentId.length === 24)
          return [currentId, ...prev].slice(0, 5);
        return prev;
      });
    }
  }, [currentSlug]);

  useEffect(() => {
    const idsString = localStorage.getItem(key);

    if (idsString) {
      const idsArray = JSON.parse(idsString);

      if (Array.isArray(idsArray) && idsArray.length > 0) {
        setIds(idsArray);
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      localStorage.setItem(key, JSON.stringify(ids));
    };
  }, [ids]);

  return { recentViewedProducts, length: ids.length, isLoading };
};

export default useRecentViewedProducts;
