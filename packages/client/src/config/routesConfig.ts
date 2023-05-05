const productDetail = (id: string, slug: string) => `/products/${slug}-${id}`;

const routesConfig = {
  home: '/',
  productDetail,
  profile: {
    orders: '/profile/orders',
  },
};

export default routesConfig;
