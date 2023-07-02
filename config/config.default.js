/* eslint valid-jsdoc: "off" */

'use strict';

const { datasourceConfig } = require('./datasource.dev');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1688200877377_3940';

  // add your middleware config here
  config.middleware = [ 'errorHandler' ];

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
  };

  config.validatePlus = {
    convert: true,
    widelyUndefined: true,
  };


  config.sequelize = {
    datasources: datasourceConfig(),
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
