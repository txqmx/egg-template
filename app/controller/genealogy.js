'use strict';

const BaseController = require('./baseController');

class GenealogyController extends BaseController {
  constructor(...arg) {
    super(...arg);
    this.serviceName = 'genealogy'; // 名称
    this.scene.add = {
      name: [{ required: true, message: 'name不能为空' }],
      code: [{ required: true, message: 'code不能为空' }],
    };
    this.keywords.in = [ 'id', 'code' ];
    this.keywords.like = [ 'name' ];
  }
}

module.exports = GenealogyController;
