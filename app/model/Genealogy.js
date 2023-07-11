'use strict';
module.exports = (app, model) => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;

  const Genealogy = model.define('Genealogy', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    code: STRING(60),
    name: STRING(60),
    password: STRING(255),
    desc: STRING(255),
    cover: STRING(255),
    detail: TEXT('long'),
  });
  // Genealogy.associate = () => {
  //   model.Genealogy.hasOne(model.Page, { sourceKey: 'pageId', foreignKey: 'id' });
  // };
  return Genealogy;
};
