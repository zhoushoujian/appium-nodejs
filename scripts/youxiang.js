"use strict"
require("../exploit/init")
describe("进入有象app", function () {
  this.timeout(120000)

  before(function () {
    localServer.start()
    return driver.init(caps.android20).setImplicitWaitTimeout(5000).sleep(6500)
  })

  after(function () {
    localServer.stop()
    return driver.quit()
  })
  
  it("login in espace", function () {
    return driver.elementByName("电视剧").click().sleep(2500)
    .elementByName("电影").click().sleep(2500)
    .elementByName("综艺").click().sleep(2500)
    .elementByName("娱乐").click().sleep(2500)
    .hasElementByName('娱乐情报局').should.become(true)
  })
})