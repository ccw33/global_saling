module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/masters',
      handler: 'master.find',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/masters/count',
      handler: 'master.count',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/masters/:id',
      handler: 'master.findOne',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/masters',
      handler: 'master.create',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'PUT',
      path: '/masters/:id',
      handler: 'master.update',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'DELETE',
      path: '/masters/:id',
      handler: 'master.delete',
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};
