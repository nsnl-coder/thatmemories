const queryConfig = {
  collections: {
    singularName: 'collection',
    pluralName: 'collections',
    url: '/api/collections',
  },
  products: {
    singularName: 'product',
    pluralName: 'products',
    url: '/api/products',
  },
  coupons: {
    singularName: 'coupon',
    pluralName: 'coupons',
    url: '/api/coupons',
  },
  shippings: {
    singularName: 'shipping',
    pluralName: 'shippings',
    url: '/api/shippings',
  },
  menus: {
    singularName: 'menu',
    pluralName: 'menus',
    url: '/api/menus',
  },
  files: {
    singularName: 'file',
    pluralName: 'files',
    url: '/api/files',
  },
  homes: {
    singularName: 'home',
    pluralName: 'home',
    url: '/api/homes',
  },
  orders: {
    singularName: 'order',
    pluralName: 'orders',
    url: '/api/orders',
  },
  users: {
    singularName: 'user',
    pluralName: 'users',
    url: '/api/users',
  },
};

interface RequestConfig {
  singularName: string;
  pluralName: string;
  url: string;
}

export default queryConfig;
export type { RequestConfig };
