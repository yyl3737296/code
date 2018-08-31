'use strict';

exports.cors = {
    enable: true,
    package: 'egg-cors',
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};

exports.mongo = {
  enable: true,
  package: 'egg-mongo-native',
};
// had enabled by egg
// exports.static = true;
