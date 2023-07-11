'use strict';

const BaseController = require('./BaseController');
const FileCateValidate = require('../validate/FileCateValidate');

class FileCateController extends BaseController {
  constructor(...arg) {
    super(...arg);
    this.service = 'fileCate'; // 名称

    this.validate = new FileCateValidate(this.ctx);
  }


}

module.exports = FileCateController;
