'use strict'
let caps = require('../config/caps')
exports.local = {
  host: 'localhost',
  port: caps.android18.port
};
exports.remote = {
  host: 'localhost',
  port: caps.android19.port
}
console.log('初始化客户端端口环境   ok'.green)
exports.sauce = {
  host: 'ondemand.saucelabs.com',
  port: 80,
  auth: process.env.npm_package_config_username + ":" + process.env.npm_package_config_key
};
