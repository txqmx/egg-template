'use strict';

const Service = require('egg').Service;

class BseService extends Service {
  constructor(...arg) {
    super(...arg);
    this.model = 'model';
  }
  run(callback) {
    const { ctx, app } = this;
    try {
      if (callback) { return callback(ctx, app); }
    } catch (error) {
      return null;
    }
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

  async queryList(params) {
    const { ctx } = this;
    const _where = { ...params };
    if (params.name) {
      _where.name = params.name && {
        $like: `%${params.name}%`,
      };
    }

    if (params.id) {
      const ids = params.id.split(',').map(item => parseInt(item));
      _where.id = {
        $in: ids,
      };
    }
    let result = await ctx[this.model][this.modelName].findAll({
      where: _where,
      // limit: params.pageSize,
      // offset: (params.pageNum - 1) * params.pageSize,
    });
    if (params.id) {
      const ids = params.id.split(',').map(item => parseInt(item));
      if (ids.length > 2) {
        const sortResult = [];
        ids.forEach(id => {
          const item = result.find(item => item.dataValues.id === id);
          if (item) {
            sortResult.push(item);
          }
        });
        result = sortResult;
      }
    }

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
