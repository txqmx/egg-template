'use strict';

const BaseController = require('./BaseController');
const PhotoCateValidate = require('../validate/PhotoCateValidate');

class PhotoCateController extends BaseController {
  constructor(...arg) {
    super(...arg);
    this.service = 'photoCate'; // 名称

    this.validate = new PhotoCateValidate(this.ctx);
  }


}

module.exports = PhotoCateController;
