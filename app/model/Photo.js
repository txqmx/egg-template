'use strict';
module.exports = (app, model) => {
  const { STRING, INTEGER, TINYINT, TEXT } = app.Sequelize;

  const Photo = model.define('photo', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    cid: INTEGER,
    title: STRING(255),
    desc: STRING(255),
    url: TEXT('long'),
    content: TEXT('long'),
    source_id: INTEGER,
    source: { type: TINYINT(1), defaultValue: 0 }, // 0-后台 1用户
    sort: INTEGER,
    is_show: { type: TINYINT(1), defaultValue: 1 },
  });

  return Photo;
};
