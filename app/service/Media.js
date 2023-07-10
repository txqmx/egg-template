'use strict';

const BaseService = require('./BaseService');
// const md5 = require('md5');

class MediaService extends BaseService {
  constructor(...arg) {
    super(...arg);
    this.delegate = this.ctx.header.family || 'model'; // ctx.model
    this.model = 'Media'; // 模型名称
  }
}

module.exports = MediaService;
