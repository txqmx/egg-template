'use strict';

const BaseController = require('./BaseController');

class FileCateController extends BaseController {
  constructor(...arg) {
    super(...arg);
    this.service = 'genealogy'; // service名称
    this.scene.add = {
      name: [{ required: true, message: 'name不能为空' }],
      code: [{ required: true, message: 'code不能为空' }],
    };
    this.keywords.in = [ 'id', 'code' ];
    this.keywords.like = [ 'name' ];
  }
}

module.exports = FileCateController;
