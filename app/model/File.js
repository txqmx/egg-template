'use strict';
module.exports = (app, model) => {
  const { STRING, INTEGER, TINYINT } = app.Sequelize;

  const File = model.define('File', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    cid: INTEGER,
    name: STRING(60),
    url: STRING(255),
    ext: STRING(30),
    size: STRING(30),
    type: { type: TINYINT(1), defaultValue: 1 }, // 类型:1-img 2-video 3-audio
    source_id: INTEGER,
    source: { type: TINYINT(1), defaultValue: 0 }, // 0-后台 1用户
  });

  return File;
};
