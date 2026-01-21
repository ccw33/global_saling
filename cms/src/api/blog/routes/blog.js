module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/blogs',
      handler: 'blog.find',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/blogs/count',
      handler: 'blog.count',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/blogs/:id',
      handler: 'blog.findOne',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/blogs',
      handler: 'blog.create',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'PUT',
      path: '/blogs/:id',
      handler: 'blog.update',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'DELETE',
      path: '/blogs/:id',
      handler: 'blog.delete',
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};
