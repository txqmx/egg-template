'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 家谱管理
  router.post('/api/genealogy/create', controller.genealogy.create);
  router.get('/api/genealogy/detail', controller.genealogy.findOne);
  router.get('/api/genealogy/list', controller.genealogy.findAll);
  router.post('/api/genealogy/update', controller.genealogy.update);
  router.post('/api/genealogy/delete', controller.genealogy.delete);

  // 文件分类
  router.post('/api/fileCate/create', controller.fileCate.create);
  router.get('/api/fileCate/detail', controller.fileCate.findOne);
  router.get('/api/fileCate/list', controller.fileCate.findAll);
  router.post('/api/fileCate/update', controller.fileCate.update);
  router.post('/api/fileCate/delete', controller.fileCate.delete);
};
