'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/login', controller.login.login);

  //const UserInterceptor = app.middleware.userInterceptor({}, app);
  //router.get('/userInfo', UserInterceptor, controller.login.getUserInfo);
  router.get('/userInfo', controller.login.getUserInfo);

  //router.resources('user', '/api/user', controller.user.user);

};
