'use strict';

const BaseService = require('./BaseService');
// const md5 = require('md5');

class ArticleCateService extends BaseService {
  constructor(...arg) {
    super(...arg);
    this.delegate = this.ctx.header.family || 'model'; // ctx.model
    this.model = 'ArticleCate'; // 模型名称
  }
}

module.exports = ArticleCateService;
