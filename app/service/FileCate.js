'use strict';

const BaseService = require('./BaseService');
// const md5 = require('md5');

class FileCateService extends BaseService {
  constructor(...arg) {
    super(...arg);
    this.delegate = this.ctx.header.family || 'model'; // ctx.model
    this.model = 'FileCate'; // 模型名称
  }

  async delete(id) {
    const result = await this.ctx[this.delegate][this.model].findByPk(id);
    if (!result) {
      this.ctx.error('不存在');
    }
    const child = await this.ctx[this.delegate][this.model].findOne({
      where: { pid: result.id },
    });
    if (child) {
      this.ctx.error('请先删除子级');
    }
    await result.destroy();
    return result;
  }


}

module.exports = FileCateService;
