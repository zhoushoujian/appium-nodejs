var path = require("path");
exports.ios92 = {
  browserName: '',
  'appium-version': '1.6',
  platformName: 'iOS',
  platformVersion: '10.1',
  deviceName: 'iPhone 5s',
  app: undefined // will be set later
};

exports.ios81 = {
  browserName: '',
  'appium-version': '1.6',
  platformName: 'iOS',
  platformVersion: '10.1',
  deviceName: 'iPhone Simulator',
  app: undefined // will be set later
};

exports.android18 = {
  browserName: '',
  'appium-version': '1.4.16.1',
  platformName: 'Android',
  platformVersion: '7.0',
  deviceName: 'bu zhuang X',
  automationName : "appium",
  orientation : "PORTRAIT", 
  noReset : false,  //不要在会话前重置应用状态
  //avd : "api19",
  log: path.resolve(__dirname,"../server/webdriver.log"),
  logLevel: 'debug',
  logTimeStamp: true,
  deviceReadyTimeout : 5,
  exported : true,
  port : 4723,
  bootstrapPort : 4724,
  udid: "127.0.0.1:62001",   //S9B4C17417011067
  newCommandTimeout : 120,
  androidDeviceReadyTimeout : 120,
  appPackage: "com.huawei.espacev2",  //关联到软终端的appPackage
  appActivity: 'com.huawei.espace.module.login.ui.LoginActivity'  //关联到软终端的appActivity
};

exports.android19 = {
  browserName: '',
  'appium-version': '1.4.16.1',
  platformName: 'Android',
  platformVersion: '7.0',
  deviceName: 'bu zhuang X',
  automationName : "appium",
  orientation : "PORTRAIT", 
  noReset : false,  //不要在会话前重置应用状态
  logLevel: 'debug',
  logTimeStamp: true,
  deviceReadyTimeout : 5,
  exported : true,
  port : 5723,
  bootstrapPort : 5724,
  udid: "127.0.0.1:62025",  
  newCommandTimeout : 120,
  androidDeviceReadyTimeout : 120,
  appPackage: "com.huawei.espacev2",  //关联到软终端的appPackage
  appActivity: 'com.huawei.espace.module.login.ui.LoginActivity'  //关联到软终端的appActivity
};

exports.android20 = {
  browserName: '',
  'appium-version': '1.4.16.1',
  platformName: 'Android',
  platformVersion: '8.0',
  deviceName: 'bu zhuang X',
  automationName : "appium",
  orientation : "PORTRAIT", 
  noReset : true,  //不要在会话前重置应用状态
  //avd : "api19",
  log: path.resolve(__dirname,"../server/webdriver.log"),
  logLevel: 'debug',
  logTimeStamp: true,
  deviceReadyTimeout : 5,
  exported : true,
  port : 4723,
  bootstrapPort : 4724,
  udid: "befdec5b",   //S9B4C17417011067   127.0.0.1:62001
  newCommandTimeout : 120,
  androidDeviceReadyTimeout : 120,
  appPackage: "com.huawei.CloudLink",  //关联到软终端的appPackage
  appActivity: 'com.huawei.weLink.WeLinkActivity'  //关联到软终端的appActivity
};
exports.selendroid16 = {
  browserName: '',
  'appium-version': '1.6',
  platformName: 'Android',
  platformVersion: '5.1',
  automationName: 'selendroid',
  deviceName: 'Android Emulator',
  app: undefined // will be set later
};

