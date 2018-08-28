'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1534748414162_9826';

  // add your config here
  config.middleware = ['userInterceptor'];

  config.redis = { 
    client: { 
      port: 6379, // Redis port 
      host: '127.0.0.1', // Redis host 
      password: '', 
      db: 0, 
    }
  };

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ['http://localhost:8080']
  };

  config.core = {
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  }

  return config;
};