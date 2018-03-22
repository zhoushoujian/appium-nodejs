"use strict"
require("../exploit/init")

describe("启动welink", function () {
  this.timeout(300000)
  desired = {
    browserName: 'huaweiespace',
    'appium-version': '1.4.16',
    platformName: 'Android',
    platformVersion: '7.0',
    deviceName: 'bu zhuang X',
    noReset : 'true',
    appPackage: "com.huawei.weLinkSoftClient",
    appWaitActivity: "com.huawei.weLink.WeLinkActivity",
    appActivity: 'com.huawei.weLink.WeLinkActivity'
  }
  before(function () {
    localServer.start()
    return driver.init(desired).sleep(15000)
  })
  after(function () {
    localServer.stop()
    return driver.quit()
  })
  it("login in welink", function () {
    return driver.elementByAccessibilityId("登录设置").tap().sleep(1500)
                 .elementByAccessibilityId('服务器设置').tap().sleep(1500)
                 .elementByXPath('//android.view.View[@index = 1]').click().clear().keys("10.174.12.122").sleep(1500)
                 .elementByXPath('//android.view.View[@index = 2]').click().clear().keys("8443").sleep(1500)
                 .elementByAccessibilityId('保存').click().sleep(1500)
                 .elementByClassName("android.widget.Button").click().sleep(1500)
                 .elementById('wrap').click().clear().type("zsj@welink.com")
                 .elementById('password').click().clear().type("1qaz@WSX")
                 .elementByAccessibilityId('登录').click().sleep(8000)
  })
})
