"use strict";
require("../exploit/init");
describe("launch cloudlink", function () {
  this.timeout(120000);

  before(function () {
    localServer.start();
    return driver.init(caps.android20).setImplicitWaitTimeout(8000);
  });
  after(function () {
    localServer.stop();
    return driver.quit();
  });
  it("launch", function () {
    return driver
      .sleep(8000)
      .contexts()
      .then(data => {
        console.log(data[1]);
        return driver
          .context(data[1])
          .currentContext()
          .then(s => {
            console.log(s);
            return driver
              .elementByCss(
                "#mlogin-container > div.bar-bottom > div.login-set-btn"
              )
              .click()
              .sleep(1500)
              .elementByCss(
                "#root > mnav > div.user-setting-info > div.scroll-area > div:nth-child(2) > div:nth-child(2) > div.item-text"
              )
              .click()
              .sleep(1500)
              .elementByCss(
                "#server-wraper > div.login-server-settings-content-server > div.server-wrap > div.server-input-area > input"
              )
              .click()
              .clear()
              .type("10.174.12.122")
              .elementByCss(
                "#server-wraper > div.login-server-settings-content > div > input"
              )
              .click()
              .clear()
              .type("8443")
              .sleep(2500)
              .elementByCss("#login-settings-header > div.login-settings-done")
              .click()
              .sleep(1500)
              .elementByCss(
                "#root > mnav > div.user-setting-info > div.am-navbar.am-navbar-light > div.am-navbar-left > span > div"
              )
              .click()
              .sleep(1500)
              .elementByCss("#wrap")
              .click()
              .clear()
              .sleep(1500)
              .type("pc001@auto");
          })
          .then(() =>
            driver
            .elementByCss("#password")
            .click()
            .clear()
            .sleep(1500)
            .type("1qaz@WSX")
            .hideKeyboard()
            .elementByCss(
              "#login-main-bg > div:nth-child(4) > div > div.btn-text.max-line-2"
            )
            .click()
            .sleep(6500)
          );
      });
  });
});