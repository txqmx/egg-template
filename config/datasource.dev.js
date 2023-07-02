'use strict';
const Op = require('sequelize').Op;

const mainDatabase = [
  {
    database: 'egg_test',
    username: 'zongxintang',
    password: '12345678',

  },
];
const familyDatabase = [];


exports.datasourceConfig = () => {
  return [ ...mainDatabase, ...familyDatabase ].map(item => {
    return {
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      // 中国时区
      timezone: '+08:00',
      define: {
        timestamps: true, // 自动写入create,update,delete时间戳
        freezeTableName: true, // 防止修改表名为复数
        createdAt: 'createTime',
        updatedAt: 'updateTime',
      },
      operatorsAliases: {
        $like: Op.like,
        $in: Op.in,
      },
      ...item,
    };
  });
};