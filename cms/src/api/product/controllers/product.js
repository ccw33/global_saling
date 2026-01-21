'use strict';

module.exports = {
  async find(ctx) {
    try {
      const entities = await strapi.services['product'].find(ctx.query);
      return ctx.send(entities);
    } catch (err) {
      ctx.badRequest('Error finding products');
    }
  },

  async findOne(ctx) {
    try {
      const entity = await strapi.services['product'].findOne(ctx.params);
      return ctx.send(entity);
    } catch (err) {
      ctx.badRequest('Error finding product');
    }
  },

  async count(ctx) {
    try {
      const count = await strapi.services['product'].count(ctx.query);
      return ctx.send({ count });
    } catch (err) {
      ctx.badRequest('Error counting products');
    }
  },

  async create(ctx) {
    try {
      const entity = await strapi.services['product'].create(ctx.request.body);
      return ctx.created(entity);
    } catch (err) {
      ctx.badRequest('Error creating product');
    }
  },

  async update(ctx) {
    try {
      const entity = await strapi.services['product'].update(ctx.params, ctx.request.body);
      return ctx.send(entity);
    } catch (err) {
      ctx.badRequest('Error updating product');
    }
  },

  async delete(ctx) {
    try {
      await strapi.services['product'].delete(ctx.params);
      return ctx.noContent();
    } catch (err) {
      ctx.badRequest('Error deleting product');
    }
  },
};
