'use strict';

const BaseService = require('./BaseService');
// const md5 = require('md5');

class GenealogyService extends BaseService {
  constructor(...arg) {
    super(...arg);
    this.delegate = this.ctx.header.family || 'model'; // ctx.model
    this.model = 'Genealogy'; // 模型名称
  }

  async create(params) {
    const { ctx } = this;
    const _where = { code: params.code };
    const cur = await ctx[this.delegate][this.model].findOne({
      where: _where,
    });
    if (cur) {
      this.ctx.error('code不能重复');
    }
    const result = await ctx[this.delegate][this.model].create(params);
    return result;
  }
}

module.exports = GenealogyService;
