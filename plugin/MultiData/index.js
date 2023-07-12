'use strict';

const path = require('path');
const sleep = require('mz-modules/sleep');
const AUTH_RETRIES = Symbol('authenticateRetries');

class MultiData {
  constructor(app) {
    this.app = app;
    this.defaultConfig = {
      delegate: 'model',
      baseDir: 'model',
      logging(...args) {
        // if benchmark enabled, log used
        const used = typeof args[1] === 'number' ? `(${args[1]}ms)` : '';
        app.logger.info('[egg-sequelize]%s %s', used, args[0]);
      },
      host: 'localhost',
      port: 3306,
      username: 'root',
      benchmark: true,
      define: {
        freezeTableName: false,
        underscored: true,
      },
    };
    this.config = app.config.sequelize;
    app.Sequelize = this.config.Sequelize || require('sequelize');
    this.databases = [];
    if (!this.config.datasources) {
      this.databases.push(this.loadDatabase(Object.assign({}, this.defaultConfig, this.config)));
    } else {
      this.config.datasources.forEach(datasource => {
        this.databases.push(this.loadDatabase(Object.assign({}, this.defaultConfig, datasource)));
      });
    }

    app.beforeStart(async () => {
      await Promise.all(this.databases.map(database => this.authenticate(database)));
    });
  }

  loadDatabase(config = {}) {
    const app = this.app;
    if (typeof config.ignore === 'string' || Array.isArray(config.ignore)) {
      this.app.deprecate(`[egg-sequelize] if you want to exclude ${config.ignore} when load models, please set to config.sequelize.exclude instead of config.sequelize.ignore`);
      config.exclude = config.ignore;
      delete config.ignore;
    }

    const sequelize = config.connectionUri ?
      new app.Sequelize(config.connectionUri, config) :
      new app.Sequelize(config.database, config.username, config.password, config);

    console.log('----------', sequelize);
    const delegate = config.delegate.split('.');
    const len = delegate.length;

    let model = app;
    let context = app.context;
    for (let i = 0; i < len - 1; i++) {
      model = model[delegate[i]] = model[delegate[i]] || {};
      context = context[delegate[i]] = context[delegate[i]] || {};
    }

    if (model[delegate[len - 1]]) {
      throw new Error(`[egg-sequelize] app[${config.delegate}] is already defined`);
    }

    Object.defineProperty(model, delegate[len - 1], {
      value: sequelize,
      writable: false,
      configurable: true,
    });

    const DELEGATE = Symbol(`context#sequelize_${config.delegate}`);
    Object.defineProperty(context, delegate[len - 1], {
      get() {
        // context.model is different with app.model
        // so we can change the properties of ctx.model.xxx
        if (!this[DELEGATE]) {
          this[DELEGATE] = Object.create(model[delegate[len - 1]]);
          this[DELEGATE].ctx = this;
        }
        return this[DELEGATE];
      },
      configurable: true,
    });

    const modelDir = path.join(this.app.baseDir, 'app', config.baseDir);

    const models = [];
    const target = Symbol(config.delegate);

    app.loader.loadToApp(modelDir, target, {
      caseStyle: 'upper',
      ignore: config.exclude,
      filter(model) {
        if (!model || !model.sequelize) return false;
        models.push(model);
        return true;
      },
      initializer(factory) {
        if (typeof factory === 'function') {
          return factory(app, sequelize);
        }
      },
    });
    Object.assign(model[delegate[len - 1]], this.app[target]);

    models.forEach(model => {
      typeof model.associate === 'function' && model.associate();
    });

    return model[delegate[len - 1]];
  }

  async authenticate(database) {
    database[AUTH_RETRIES] = database[AUTH_RETRIES] || 0;

    try {
      await database.authenticate();
    } catch (e) {
      if (database[AUTH_RETRIES] >= 3) throw e;

      // sleep 1s to retry, max 3 times
      database[AUTH_RETRIES] += 1;
      this.app.logger.warn(`Sequelize Error: ${e.message}, sleep 1 seconds to retry...`);
      await sleep(1000);
      await this.authenticate(database);
    }
  }

  getDatabases() {
    return this.databases;
  }

}

module.exports = MultiData;
