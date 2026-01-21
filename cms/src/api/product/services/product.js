'use strict';

module.exports = {
  async find(params, populate) {
    const { results, pagination } = await strapi.entityService.findMany('api::product.product', {
      ...params,
      populate,
    });
    return { results, pagination };
  },

  async findOne(params, populate) {
    const result = await strapi.entityService.findOne('api::product.product', {
      ...params,
      populate,
    });
    return result;
  },

  async count(params) {
    return await strapi.entityService.count('api::product.product', params);
  },

  async create(data) {
    return await strapi.entityService.create('api::product.product', data);
  },

  async update(params, data) {
    return await strapi.entityService.update('api::product.product', params, data);
  },

  async delete(params) {
    return await strapi.entityService.delete('api::product.product', params);
  },
};
