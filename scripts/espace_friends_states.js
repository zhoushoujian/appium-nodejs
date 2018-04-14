"use strict"
require("../exploit/init")
describe("向espace朋友圈发动态", function () {
  this.timeout(120000)

  before(function () {
    localServer.start()
    return driver.init(caps.android18).setImplicitWaitTimeout(5000)
  })
  after(function () {
    localServer.stop()
    return driver.quit()
  })
  it("login in espace", function () {
    return driver.login("username","***********")
                 .then(() => driver.friendsStates("appium loves you"))
  })
})