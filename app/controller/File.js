'use strict';

const BaseController = require('./BaseController');
const FileValidate = require('../validate/FileValidate');

class FileController extends BaseController {
  constructor(...arg) {
    super(...arg);
    this.service = 'file'; // 名称

    this.validate = new FileValidate(this.ctx);
  }


}

module.exports = FileController;
