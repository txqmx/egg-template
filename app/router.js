'use strict';

const actionObject = [
  'genealogy',
  'fileCate',
  'file',
  'articleCate',
  'article',
  'media',
  'mediaCate',
  'photo',
  'photoCate',

];

function getbaseAction(router, controller) {
  actionObject.forEach(item => {
    router.post(`/api/${item}/create`, controller[item].create);
    router.get(`/api/${item}/detail`, controller[item].findOne);
    router.get(`/api/${item}/list`, controller[item].findAll);
    router.post(`/api/${item}/update`, controller[item].update);
    router.post(`/api/${item}/delete`, controller[item].delete);
  });
}

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  getbaseAction(router, controller);

  // 文件分类
  router.get('/api/fileCate/treeList', controller.fileCate.treeList);

  // 系统
  router.get('/api/system/getDatabases', controller.systemController.getDatabases);
  router.post('/api/system/testConnection', controller.systemController.testConnection);

};
