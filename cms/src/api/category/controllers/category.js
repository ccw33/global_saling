'use strict';

module.exports = {
  async find(ctx) {
    try {
      const entities = await strapi.services['category'].find(ctx.query);
      return ctx.send(entities);
    } catch (err) {
      ctx.badRequest('Error finding categories');
    }
  },

  async findOne(ctx) {
    try {
      const entity = await strapi.services['category'].findOne(ctx.params);
      return ctx.send(entity);
    } catch (err) {
      ctx.badRequest('Error finding category');
    }
  },

  async count(ctx) {
    try {
      const count = await strapi.services['category'].count(ctx.query);
      return ctx.send({ count });
    } catch (err) {
      ctx.badRequest('Error counting categories');
    }
  },

  async create(ctx) {
    try {
      const entity = await strapi.services['category'].create(ctx.request.body);
      return ctx.created(entity);
    } catch (err) {
      ctx.badRequest('Error creating category');
    }
  },

  async update(ctx) {
    try {
      const entity = await strapi.services['category'].update(ctx.params, ctx.request.body);
      return ctx.send(entity);
    } catch (err) {
      ctx.badRequest('Error updating category');
    }
  },

  async delete(ctx) {
    try {
      await strapi.services['category'].delete(ctx.params);
      return ctx.noContent();
    } catch (err) {
      ctx.badRequest('Error deleting category');
    }
  },
};
