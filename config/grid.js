var path = require("path");
exports.desired = {
    browserName: '',
    'appium-version': '1.4.16.1',
    platformName: 'Android',
    platformVersion: '7.0',
    deviceName: 'bu zhuang X',
    automationName : "appium",
    orientation : "PORTRAIT", 
    noReset : false,  //不要在会话前重置应用状态
    //avd : "api19",
    log: path.resolve(__dirname,"../server/appiumLog.log"),
    logLevel: 'debug',
    logTimeStamp: true,
    deviceReadyTimeout : 5,
    exported : true,
    udid: "127.0.0.1:62001",   //S9B4C17417011067
    newCommandTimeout : 25,
    androidDeviceReadyTimeout : 25,
    appPackage: "com.huawei.espacev2",  //关联到软终端的appPackage
    appActivity: 'com.huawei.espace.module.login.ui.LoginActivity'  //关联到软终端的appActivity
  }