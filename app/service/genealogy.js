'use strict';

const BaseService = require('./baseService');
// const md5 = require('md5');

class GenealogyService extends BaseService {
  constructor(...arg) {
    super(...arg);
    this.modelName = 'Genealogy';
    // this.model = this.ctx.header.family;
  }
}

module.exports = GenealogyService;
