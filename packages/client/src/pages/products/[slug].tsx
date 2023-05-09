import ProductImages from '@src/_pages/products/ProductImages';
import ProductInfo from '@src/_pages/products/ProductInfo';
import ProductTabs from '@src/_pages/products/ProductTabs';
import RecentViewedProducts from '@src/_pages/products/RecentViewedProducts';
import RelatedProduct from '@src/_pages/products/RelatedProduct';
import BreadCrumb from '@src/components/breadcrumb/BreadCrumb';
import RowContainer from '@src/components/container/RowContainer';
import fetchData from '@src/config/fetchData';
import routesConfig from '@src/config/routesConfig';
import { useAppDispatch } from '@src/hooks/redux';
import useRecentViewedProducts from '@src/hooks/useRecentViewedProducts';
import { setCarouselImages } from '@src/store/productCarousel';
import { HttpResponse } from '@src/types/http';
import { IProduct } from '@thatmemories/yup';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { useEffect } from 'react';

interface Props {
  product: IProduct | null;
  relatedProducts: IProduct[] | null;
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

function Product(props: Props): JSX.Element | null {
  const slug = useRouter().query.slug;
  const { product, relatedProducts } = props;
  const { recentViewedProducts, length, isLoading } = useRecentViewedProducts(); // tracking recent viewed product
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setCarouselImages({
        productImages: product?.images || [],
        variants: product?.variants,
      }),
    );
  }, [slug, dispatch, product?.images, product?.variants]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) return null;

  return (
    <RowContainer>
      <BreadCrumb
        paths={[
          {
            link: routesConfig.productDetail(
              product._id.toString(),
              product.slug,
            ),
            text: product.name!,
          },
        ]}
      />
      <div className="flex flex-col lg:flex-row gap-x-20 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-x-16">
          <ProductImages images={product.images} variants={product.variants} />
          <ProductInfo product={product} />
        </div>
        {(recentViewedProducts?.length || isLoading) && (
          <div className="w-72 flex-shrink-0 hidden lg:block">
            <RecentViewedProducts
              products={recentViewedProducts}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
      <ProductTabs
        description={product.description}
        shippingPolicy=""
        reviews=""
      />
      <RelatedProduct products={relatedProducts} />
    </RowContainer>
  );
}

export default Product;

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const { slug } = params!;
  const id = slug.split('-').at(-1);
  const { data: product } = await fetchData<HttpResponse<IProduct>>(
    `/api/products/${id}`,
  );

  if (!product) {
    return {
      notFound: true,
    };
  }

  // fetch related product based on collections
  const collections = product?.collections?.join(',');

  let relatedProducts;

  if (collections) {
    const { data } = await fetchData<HttpResponse<IProduct[]>>(
      `/api/products/random?collections=${collections}&limit=6`,
    );
    relatedProducts = data;
  }
  return {
    props: {
      product: product || null,
      relatedProducts: relatedProducts || null,
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const res = await fetchData<HttpResponse<IProduct[]>>(
    '/api/products?fields=slug&limit=6',
  );

  const paths =
    res.data?.map((product) => ({
      params: { slug: `${product.slug}-${product._id}` },
    })) || [];

  return {
    paths,
    fallback: 'blocking',
  };
};
