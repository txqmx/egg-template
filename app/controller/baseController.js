'use strict';
const Controller = require('egg').Controller;

class BaseController extends Controller {

  // 新增
  async create() {
    const { ctx } = this;
    const rule = {
      // name: [{ required: true, message: 'name不能为空' }],
      // code: [{ required: true, message: 'code不能为空' }],
    };
    const params = await ctx.getParams(rule);
    const result = await ctx.service[this.serviceName].create(params);
    if (result) {
      this.ctx.success(result);
    } else {
      this.ctx.error('新增失败');
    }
  }

  // 查询详情
  async findOne() {
    const { ctx } = this;
    const rule = {
      id: [{ required: true, message: 'id不能为空' }],
    };
    const params = await ctx.getParams(rule);

    const result = await ctx.service[this.serviceName].findOne(params.id);
    if (result) {
      this.ctx.success(result);
    } else {
      this.ctx.success(null);
    }
  }

  // 查询列表
  async findAll() {
    const { ctx } = this;
    const param = {};
    for (const i in ctx.params()) {
      if (ctx.params(i)) {
        param[i] = ctx.params(i);
      }
    }
    const result = await ctx.service[this.serviceName].queryList(param);
    this.success(result);
  }

  // 编辑
  async update() {
    const { ctx } = this;
    const rule = {
      id: [{ required: true, message: 'id不能为空' }],
    };
    const params = await ctx.getParams(rule);
    const result = await ctx.service[this.serviceName].update(params);
    this.ctx.success(result);
  }

  // 删除
  async delete() {
    const { ctx } = this;
    const rule = {
      id: [{ required: true, message: 'id不能为空' }],
    };
    const params = await ctx.getParams(rule);
    await ctx.service[this.serviceName].delete(params.id);
    this.ctx.success('success');
  }
}

module.exports = BaseController;
