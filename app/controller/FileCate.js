'use strict';

const BaseController = require('./BaseController');

class FileCateController extends BaseController {
  constructor(...arg) {
    super(...arg);
    this.service = 'fileCate'; // 名称
    this.scene.add = {
      name: [{ required: true, message: 'name不能为空' }],
    };
    this.keywords.in = [ 'type' ];
  }
}

module.exports = FileCateController;
