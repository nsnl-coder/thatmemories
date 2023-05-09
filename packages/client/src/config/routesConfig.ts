const productDetail = (id: string, slug: string) => `/products/${slug}-${id}`;
const orderDetail = (id: string) => `/orders/${id}`;

const routesConfig = {
  home: '/',
  productDetail,
  orderDetail,
};

export default routesConfig;
