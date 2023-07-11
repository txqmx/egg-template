'use strict';

const BaseController = require('./BaseController');
const ArticleCateValidate = require('../validate/ArticleCateValidate');

class ArticleCateController extends BaseController {
  constructor(...arg) {
    super(...arg);
    this.service = 'articleCate'; // 名称

    this.validate = new ArticleCateValidate(this.ctx);
  }


}

module.exports = ArticleCateController;
