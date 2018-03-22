"use strict"
require("../helpers/init")

describe("向espace朋友圈发动态", function () {
  this.timeout(60000)

  before(function () {
    localServer.start()
    return driver.init(desired).setImplicitWaitTimeout(5000)
  })
  after(function () {
    localServer.stop()
    return driver.quit()
  })
  it("login in espace", function () {
    return driver.login("zwx492293","zsjkl_320723")
                 .then(() => driver.friendsStates("appium loves you"))
  })
})