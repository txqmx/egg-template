'use strict';
module.exports = (app, model) => {
  const { STRING, INTEGER, TINYINT } = app.Sequelize;

  const MediaCate = model.define('MediaCate', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(60),
    desc: STRING(255),
    cover: STRING(255),
    sort: INTEGER,
    is_show: { type: TINYINT(1), defaultValue: 1 },
  });

  return MediaCate;
};
