'use strict';

module.exports = {
  async find(params, populate) {
    const { results, pagination } = await strapi.entityService.findMany('api::category.category', {
      ...params,
      populate,
    });
    return { results, pagination };
  },

  async findOne(params, populate) {
    const result = await strapi.entityService.findOne('api::category.category', {
      ...params,
      populate,
    });
    return result;
  },

  async count(params) {
    return await strapi.entityService.count('api::category.category', params);
  },

  async create(data) {
    return await strapi.entityService.create('api::category.category', data);
  },

  async update(params, data) {
    return await strapi.entityService.update('api::category.category', params, data);
  },

  async delete(params) {
    return await strapi.entityService.delete('api::category.category', params);
  },
};
