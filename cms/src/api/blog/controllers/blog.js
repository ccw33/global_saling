'use strict';

module.exports = {
  async find(params, populate) {
    const { results, pagination } = await strapi.entityService.findMany('api::blog.blog', {
      ...params,
      populate,
    });
    return { results, pagination };
  },

  async findOne(params, populate) {
    const result = await strapi.entityService.findOne('api::blog.blog', {
      ...params,
      populate,
    });
    return result;
  },

  async count(params) {
    return await strapi.entityService.count('api::blog.blog', params);
  },

  async create(data) {
    return await strapi.entityService.create('api::blog.blog', data);
  },

  async update(params, data) {
    return await strapi.entityService.update('api::blog.blog', params, data);
  },

  async delete(params) {
    return await strapi.entityService.delete('api::blog.blog', params);
  },
};
