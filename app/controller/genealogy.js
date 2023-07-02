'use strict';

const BaseController = require('./baseController');

class GenealogyController extends BaseController {
  constructor(...arg) {
    super(...arg);
    this.serviceName = 'genealogy';
  }
}

module.exports = GenealogyController;
