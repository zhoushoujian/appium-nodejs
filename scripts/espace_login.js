"use strict"
require("../exploit/init")

describe("先登录espace", function () {
  this.timeout(300000)

  before(function () {
    localServer.start()
    return driver.init(desired).setImplicitWaitTimeout(5000)
  })
  after(function () {
    localServer.stop()
    return driver.quit()
  })
  it("login in espace", function () {
    return driver.login("zwx492293","zsjkl_3207234")
                 .then(() => driver.hasElementById("com.huawei.espacev2:id/add_fab").should.become(true))
  })
})
