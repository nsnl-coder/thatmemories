import FeaturedCollection from '@src/_pages/home/FeaturedCollection';
import FeaturedCollections from '@src/_pages/home/FeaturedCollections';
import FeaturedProducts from '@src/_pages/home/FeaturedProducts';
import HeroSection from '@src/_pages/home/HeroSection';
import LatestNewsSection from '@src/_pages/home/LatestNewsSection';
import PartnerSection from '@src/_pages/home/PartnerSection';
import fetchData from '@src/config/fetchData';
import { HttpResponse } from '@src/types/http';
import { IPopulatedHome } from '@thatmemories/yup';
import { GetStaticProps } from 'next';

interface Props {
  home: IPopulatedHome | undefined;
}

export default function Home(props: Props) {
  const { home } = props;

  if (!home) return null;

  return (
    <div>
      <HeroSection carouselItems={home.carouselItems} />
      <FeaturedProducts featuredProducts={home.featuredProducts} />
      <FeaturedCollections featuredCollections={home.featuredCollections} />
      <FeaturedCollection featuredCollections={home.featuredCollections} />
      <PartnerSection />
      <LatestNewsSection />
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = await fetchData<HttpResponse<IPopulatedHome>>(
    '/api/homes/current-home-page',
  );

  return {
    props: {
      home: res.data,
    },
  };
};
