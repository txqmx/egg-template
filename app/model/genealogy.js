'use strict';
module.exports = (app, model) => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;

  const Genealogy = model.define('genealogy', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    code: STRING(50),
    name: STRING(50),
    password: STRING(50),
    info: STRING(150),
    cover: STRING(500),
    detail: TEXT('long'),
    pageId: STRING(50),
    createTime: DATE,
    updateTime: DATE,
  });
  // Genealogy.associate = () => {
  //   model.Genealogy.hasOne(model.Page, { sourceKey: 'pageId', foreignKey: 'id' });
  // };
  return Genealogy;
};
