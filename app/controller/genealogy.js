'use strict';

const BaseController = require('./BaseController');
const GenealogyValidate = require('../validate/GenealogyValidate');

class GenealogyController extends BaseController {
  constructor(...arg) {
    super(...arg);
    this.service = 'genealogy'; // service名称

    this.validate = new GenealogyValidate(this.ctx);
  }
}

module.exports = GenealogyController;
