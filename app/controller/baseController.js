'use strict';
const Controller = require('egg').Controller;

class BaseController extends Controller {
  constructor(...arg) {
    super(...arg);
    // 场景校验
    this.scene = {
      add: {},
      edit: {
        id: [{ required: true, message: 'id不能为空' }],
      },
      detail: {
        id: [{ required: true, message: 'id不能为空' }],
      },
      delete: {
        id: [{ required: true, message: 'id不能为空' }],
      },
    };
    // 列表模糊搜索字段
    this.keywords = {
      in: [ 'id' ],
      like: [],
    };
  }

  // 查询列表
  async findAll() {
    const { ctx } = this;
    const params = await ctx.getListParams(this.keywords);
    const result = await ctx.service[this.service].findAll(params);
    this.ctx.success(result);
  }

  // 新增
  async create() {
    const { ctx } = this;
    const params = await ctx.getParams(this.scene.add);
    delete params.id;
    const result = await ctx.service[this.service].create(params);
    if (result) {
      this.ctx.success(result);
    } else {
      this.ctx.error('新增失败');
    }
  }

  // 查询详情
  async findOne() {
    const { ctx } = this;
    const params = await ctx.getParams(this.scene.detail);

    const result = await ctx.service[this.service].findOne(params.id);
    if (result) {
      this.ctx.success(result);
    } else {
      this.ctx.success(null);
    }
  }

  // 编辑
  async update() {
    const { ctx } = this;
    const params = await ctx.getParams(this.scene.edit);
    const result = await ctx.service[this.service].update(params);
    this.ctx.success(result);
  }

  // 删除
  async delete() {
    const { ctx } = this;
    const params = await ctx.getParams(this.scene.delete);
    await ctx.service[this.service].delete(params.id);
    this.ctx.success('success');
  }

  // 查询树列表
  async treeList() {
    const { ctx } = this;
    const params = await ctx.getParams();
    const result = await ctx.service[this.service].findTree(params);
    this.ctx.success(result);
  }
}

module.exports = BaseController;
