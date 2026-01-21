'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/products',
      handler: 'product.find',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/products/count',
      handler: 'product.count',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/products/:id',
      handler: 'product.findOne',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/products',
      handler: 'product.create',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'PUT',
      path: '/products/:id',
      handler: 'product.update',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'DELETE',
      path: '/products/:id',
      handler: 'product.delete',
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};
