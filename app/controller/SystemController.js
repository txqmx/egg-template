'use strict';


const Controller = require('egg').Controller;
const SystemValidate = require('../validate/SystemValidate');

class SystemController extends Controller {
  constructor(...arg) {
    super(...arg);
    this.service = '';
    this.validate = new SystemValidate(this.ctx);
  }

  async getDatabases() {
    let result = await this.app.multiData.getDatabases();
    console.log(this.app.model);
    result = result.map(item => {
      return item.options;
    });

    this.ctx.success(result || []);
  }

  async testConnection() {
    const params = await this.validate.getParams();
    await this.app.multiData.testConnection(params);

    this.ctx.success('连接成功');
  }
}

module.exports = SystemController;
