'use strict';

const Service = require('egg').Service;

class BseService extends Service {
  constructor(...arg) {
    super(...arg);
    this.model = 'model';
  }

  async findAll(params) {
    const { ctx } = this;
    const result = await ctx[this.model][this.modelName].findAll(params);
    return result;
  }

  async create(params) {
    const { ctx } = this;
    const result = await ctx[this.model][this.modelName].create(params);
    return result;
  }

  async findOne(id) {
    const { ctx } = this;
    const _where = { id };
    const result = await ctx[this.model][this.modelName].findOne({
      where: _where,
    });
    return result;
  }

  async update({ id, ...params }) {
    const result = await this.ctx[this.model][this.modelName].findByPk(id);
    if (!result) {
      this.ctx.error('不存在');
    }
    await result.update(params);
    return result;
  }

  async delete(id) {
    const result = await this.ctx[this.model][this.modelName].findByPk(id);
    if (!result) {
      this.ctx.error('不存在');
    }
    await result.destroy();
    return result;
  }
}

module.exports = BseService;
