'use strict';

module.exports = {
  async find(ctx) {
    try {
      const entities = await strapi.services['master'].find(ctx.query);
      return ctx.send(entities);
    } catch (err) {
      ctx.badRequest('Error finding masters');
    }
  },

  async findOne(ctx) {
    try {
      const entity = await strapi.services['master'].findOne(ctx.params);
      return ctx.send(entity);
    } catch (err) {
      ctx.badRequest('Error finding master');
    }
  },

  async count(ctx) {
    try {
      const count = await strapi.services['master'].count(ctx.query);
      return ctx.send({ count });
    } catch (err) {
      ctx.badRequest('Error counting masters');
    }
  },

  async create(ctx) {
    try {
      const entity = await strapi.services['master'].create(ctx.request.body);
      return ctx.created(entity);
    } catch (err) {
      ctx.badRequest('Error creating master');
    }
  },

  async update(ctx) {
    try {
      const entity = await strapi.services['master'].update(ctx.params, ctx.request.body);
      return ctx.send(entity);
    } catch (err) {
      ctx.badRequest('Error updating master');
    }
  },

  async delete(ctx) {
    try {
      await strapi.services['master'].delete(ctx.params);
      return ctx.noContent();
    } catch (err) {
      ctx.badRequest('Error deleting master');
    }
  },
};
