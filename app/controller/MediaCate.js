'use strict';

const BaseController = require('./BaseController');
const MediaCateValidate = require('../validate/MediaCateValidate');

class MediaCateController extends BaseController {
  constructor(...arg) {
    super(...arg);
    this.service = 'mediaCate'; // 名称

    this.validate = new MediaCateValidate(this.ctx);
  }


}

module.exports = MediaCateController;
