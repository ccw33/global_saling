'use strict';

module.exports = {
  async find(params, populate) {
    const { results, pagination } = await strapi.entityService.findMany('api::master.master', {
      ...params,
      populate,
    });
    return { results, pagination };
  },

  async findOne(params, populate) {
    const result = await strapi.entityService.findOne('api::master.master', {
      ...params,
      populate,
    });
    return result;
  },

  async count(params) {
    return await strapi.entityService.count('api::master.master', params);
  },

  async create(data) {
    return await strapi.entityService.create('api::master.master', data);
  },

  async update(params, data) {
    return await strapi.entityService.update('api::master.master', params, data);
  },

  async delete(params) {
    return await strapi.entityService.delete('api::master.master', params);
  },
};
