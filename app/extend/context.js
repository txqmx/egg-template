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

  async getListParams(keywords = { in: [], like: [] }, isPage = false) {
    const params = await this.getParams(false, this);
    let listParams = {};
    if (isPage) {
      listParams = Object.assign(listParams, {
        limit: params.pageSize,
        offset: (params.pageNum - 1) * params.pageSize,
      });
    }
    const where = {};
    keywords.in.forEach(item => {
      if (params[item]) {
        // 类型转换问题待处理
        if (item === 'id') {
          const ids = params.id.split(',').map(item => parseInt(item));
          where[item] = {
            $in: ids,
          };
        } else {
          where[item] = {
            $in: [ item ],
          };
        }

      }
    });
    keywords.like.forEach(item => {
      if (params[item]) {
        where[item] = {
          $like: `%${params[item]}%`,
        };
      }
    });
    listParams.where = where;

    return listParams;
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
