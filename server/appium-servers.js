
exports.local = {
  host: 'localhost',
  port: 4723
};
console.log('初始化客户端端口环境   ok'.green)
exports.sauce = {
  host: 'ondemand.saucelabs.com',
  port: 80,
  auth: process.env.npm_package_config_username + ":" + process.env.npm_package_config_key
};
