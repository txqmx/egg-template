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
    // console.log(result);
    result = result.map(item => {
      console.log(item.sequelize.models);
      return Object.keys(item.sequelize.models);
    });
    console.log(result);
    this.ctx.success(result || []);
  }

  async testConnection() {
    const params = await this.validate.getParams();
    await this.app.multiData.testConnection(params);
    this.ctx.success('连接成功');
  }
}

module.exports = SystemController;
