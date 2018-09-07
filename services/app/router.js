'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/login', controller.login.login);
  router.post('/logout', controller.login.logout);

  //const UserInterceptor = app.middleware.userInterceptor({}, app);
  //router.get('/userInfo', UserInterceptor, controller.login.getUserInfo);
  router.get('/userInfo', controller.login.getUserInfo);

  router.resources('posts', '/organize', controller.organize.organize);
  router.resources('post', '/organize/:id', controller.organize.organize);

  //router.resources('user', '/api/user', controller.user.user);

};
