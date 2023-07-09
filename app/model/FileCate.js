'use strict';
module.exports = (app, model) => {
  const { STRING, INTEGER } = app.Sequelize;

  const FileCate = model.define('file_cate', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    pid: { type: INTEGER, defaultValue: 0 },
    name: STRING(60),
    type: STRING(60),
  });

  return FileCate;
};
