'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/genealogy/create', controller.genealogy.create);
  router.get('/api/genealogy/detail', controller.genealogy.findOne);
  router.get('/api/genealogy/list', controller.genealogy.findAll);
  router.post('/api/genealogy/update', controller.genealogy.update);
  router.post('/api/genealogy/delete', controller.genealogy.delete);
};
