'use strict';
module.exports = (app, model) => {
  const { STRING, INTEGER, TINYINT, TEXT } = app.Sequelize;

  const Article = model.define('Article', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    cid: INTEGER,
    title: STRING(255),
    desc: STRING(255),
    abstract: TEXT('long'),
    cover: STRING(255),
    content: TEXT('long'),
    imgs: TEXT('long'),
    audio: STRING(255),
    type: { type: TINYINT(1), defaultValue: 1 }, // 1-文章，2图文
    source_id: INTEGER,
    source: { type: TINYINT(1), defaultValue: 0 }, // 0-后台 1用户
    sort: INTEGER,
    is_show: { type: TINYINT(1), defaultValue: 1 },
  });

  return Article;
};
