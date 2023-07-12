'use strict';


const Controller = require('egg').Controller;

class SystemController extends Controller {
  constructor(...arg) {
    super(...arg);
    this.service = '';
  }
  async getDatabases() {
    let result = await this.app.multiData.getDatabases();

    result = result.map(item => {
      return item.options;
    });

    this.ctx.success(result || []);
  }
}

module.exports = SystemController;
