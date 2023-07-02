'use strict';
module.exports = {
  async getParams(validate = false, ctx = this) {
    let params = {};
    if (this.request.method === 'GET') {
      params = ctx.request.query;
    } else if (ctx.request.method === 'POST') {
      params = ctx.request.body;
    }
    if (validate) {
      const validateResult = await ctx.validate(validate, params);
      if (!validateResult) {
        const error = this.body.error;
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject({
          status: 500,
          message: error.length ? error[0].message : '参数错误',
        });
      }
      return params;
    }
    return params;

  },

  // 成功返回
  success(data = null, code = 1, status = 200) {
    this.status = status;
    this.body = {
      code,
      data,
    };
  },

  // 返回失败
  error(message = '', status = 500) {
    const err = new Error();
    err.status = status;
    err.message = message;
    throw err;
  },
};
