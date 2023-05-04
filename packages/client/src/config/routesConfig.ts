const productDetail = (id: string, slug: string) => `/products/${slug}-${id}`;

const routesConfig = {
  home: '/',
  productDetail,
};

export default routesConfig;
