let merge = require('webpack-merge');
let prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://47.93.224.34:80"',
});
