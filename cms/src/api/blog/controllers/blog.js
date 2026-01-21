'use strict';

module.exports = {
  async find(ctx) {
    try {
      const entities = await strapi.services['blog'].find(ctx.query);
      return ctx.send(entities);
    } catch (err) {
      ctx.badRequest('Error finding blogs');
    }
  },

  async findOne(ctx) {
    try {
      const entity = await strapi.services['blog'].findOne(ctx.params);
      return ctx.send(entity);
    } catch (err) {
      ctx.badRequest('Error finding blog');
    }
  },

  async count(ctx) {
    try {
      const count = await strapi.services['blog'].count(ctx.query);
      return ctx.send({ count });
    } catch (err) {
      ctx.badRequest('Error counting blogs');
    }
  },

  async create(ctx) {
    try {
      const entity = await strapi.services['blog'].create(ctx.request.body);
      return ctx.created(entity);
    } catch (err) {
      ctx.badRequest('Error creating blog');
    }
  },

  async update(ctx) {
    try {
      const entity = await strapi.services['blog'].update(ctx.params, ctx.request.body);
      return ctx.send(entity);
    } catch (err) {
      ctx.badRequest('Error updating blog');
    }
  },

  async delete(ctx) {
    try {
      await strapi.services['blog'].delete(ctx.params);
      return ctx.noContent();
    } catch (err) {
      ctx.badRequest('Error deleting blog');
    }
  },
};
