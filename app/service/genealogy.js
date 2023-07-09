'use strict';

const BaseService = require('./BaseService');
// const md5 = require('md5');

class GenealogyService extends BaseService {
  constructor(...arg) {
    super(...arg);
    this.delegate = this.ctx.header.family || 'model'; // ctx.model
    this.model = 'Genealogy'; // 模型名称
  }
}

module.exports = GenealogyService;
