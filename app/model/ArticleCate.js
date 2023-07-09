'use strict';
module.exports = (app, model) => {
  const { STRING, INTEGER } = app.Sequelize;

  const ArticleCate = model.define('ArticleCate', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(60),
    desc: STRING(255),
    cover: STRING(255),
    sort: INTEGER,
    is_show: INTEGER,
  });

  return ArticleCate;
};
