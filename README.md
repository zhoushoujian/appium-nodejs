# appium 环境搭建

## Install

```shell
npm i
```

## 安装 node

根据自己的操作系统选择相应的版本，安装结束在 cmd 里输入 node -v，如果打印出 node 的版本表示 node 已经安装成功，输入 npm -v 打印出 npm 的版本说明 npm 安装成功

## 配置 Android SDK 环境

安装 Android SDK，设置 ANDROID_HOME 系统变量为你的 Android SDK 路径：C:\Program Files (x86)\Android\android-sdk；
把 tools 和 platform-tools 两个目录加入到系统 path 路径：;%ANDROID_HOME%\TOOLS;%ANDROID_HOME%\platform-tools;打开 cmd 的命令，输入 adb，打印出一堆命令提示说明环境变量配置成功

## 配置 Android jdk 环境

安装 Android jdk，设置 JAVA_HOME 系统变量为你的 Android JDK 路径：C:\Program Files\Java\jdk1.8.0_31；
将 bin 文件夹和 jre\bin 文件夹添加到 path 系统变量：;%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin
检查 java 环境是否配置成功，进入 cmd 输出 java 或 javac，可以看到好多命令提示，说明成功了

## 安装 appium

尽量装最新版的 appium（注意：appium 需要.net4.0）,然后将 C:\Program Files (x86)\Appium\node_modules\\.bin 添加到 path 系统变量
打开 windows 命令提示符，通过 appium-doctor 命令检查 appium 环境，如果出现“All Checks were successful”的提示，说明基本环境已经搞好。

## 元素选择器

`1.1通过id定位元素：Android里面定位的id一般为resource-id`

`1.2通过name定位元素：一般text属性认为是name`

`1.3通过ClassName定位元素：classname指的是class属性`

`1.4通过xpath定位：WebElement sells = driver.findElement(By.xpath("//android.widget.TextView[contains(@text,'正在售票')]"));`
WebElement movie = driver.findElement(By.xpath("//android.widget.TextView[@text='夜孔雀']"));
WebElement banner =driver.findElement(By.xpath("//android.support.v7.widget.RecyclerView/android.widget.LinearLayout/android.widget.LinearLayout")) ;
WebElement menu_me = driver.findElement(By.xpath("//\*[@resource-id='com.gewara:id/side_menu_home']/android.widget.TextView"));

`1.5通过AccessibilityId定位元素：定位元素的方式和name，id一样（content-desc）`

## 连接模拟器或真机

### avd 模拟器

Android SDK 自带了 avd 模拟器，但是性能有些差,不建议使用

### 夜神模拟器（推荐）

如果模拟器已经启动，请先关闭；再输入 adb devices,打印出 daemon started successfully 说明正常

将 C:\Program Files (x86)\Nox\bin 添加到 path 环境变量，然后在命令行输入 nox_adb.exe connect 127.0.0.1:62001,

再次启动模拟器，输入 adb devices 可以看到 device 的 udid 为 127.0.0.1：62001；

如果遇到：目前运行服务器端的 adb 版本（也就是夜神模拟器的 adb 版本）比客户端的版本（也就是 SDK 目录下的 adb 版本）低，

须将 SDK 目录下的 adb.exe 文件，复制到夜神模拟器的目录下，并改名 nox_adb.exe,重启模拟器再次输入 adb devices 查看结果

如果遇到 ADB didin't ACK,在 cmd 输入 netstat -ano | findstr "5037",找到对应的 pid 进程结束它，重新运行 adb devices 命令

在 cmd 中输入 appium -a 127.0.0.1 -p4723 -U4d007e9a1b0050d1 (-a 表示 ip，-p 表示端口，-U 表示设备的 udid 可以通过 appium -h 查看更多命令)

### 连接真机

需要提前安装手机的驱动程序，如果找不到驱动程序就下载 360 手机助手之类的第三方软件协助安装手机驱动

装完驱动程序在 cmd 里输入 adb devices 可查看手机的 UUID

如果手机系统是 Android 7.0 及其以上的版本，需要将 Android 7.0 文件夹里文件覆盖到 appium 对应的文件夹下

如测试程序时报错 command failed shell “ps ‘uiautomator’”，解决方式：打开 Appium\node_modules\appium\node_modules\appium-adb\lib\adb.js

找到如下代码：

```js
ADB.prototype.getPIDsByName = function (name, cb) {
   logger.debug("Getting all processes with '" + name + "'");
   this.shell("ps '" + name + "'", function (err, stdout) {
   if (err) return cb(err);
   stdout = stdout.trim();
   var procs = [];
   var outlines = stdout.split("\n");
  //  在这段代码下面加入这行代码：outlines.shift();
```

## appium 常用 API 函数

```js
driver.execute("mobile: scroll", [{ direction: "down" }]);
driver.execute("mobile: scroll", [
  { direction: "down", element: element.value },
]);
driver.lock(3);
driver.backgroundApp(5);
driver.hideKeyboard();
driver.startActivity(
  { appPackage: "com.example.android.apis", appActivity: ".Foo" },
  cb
);
driver.openNotifications(cb);
driver
  .isAppInstalled("com.example.android.apis")
  .then(function (isAppInstalled) {
    /*...*/
  });
driver.installApp("path/to/my.apk");
driver.removeApp("com.example.android.apis");
driver.shake();
driver.closeApp();
driver.launchApp();
driver.resetApp();
driver.contexts().then(function (contexts) {
  /*...*/
});
driver.currentContext().then(function (context) {
  /*...*/
});
driver.context();
driver.getAppStrings().then(function (appStrings) {
  /*...*/
});
driver.deviceKeyEvent(wd.SPECIAL_KEYS.Home);
driver.getCurrentActivity().then(function (activity) {
  /*...*/
});
driver
  .pullFile("Library/AddressBook/AddressBook.sqlitedb")
  .then(function (base64File) {
    /*...*/
  });
driver.pushFile(path, data);
```

## 规范中的可用事件

- 短按 (press)
- 释放 (release)
- 移动到 (moveTo)
- 点击 (tap)
- 等待 (wait)
- 长按 (longPress)
- 取消 (cancel)
- 执行 (perform)


## 平台支持

### android

支持版本：android 2.3 平台及以上。

支持的设备：Android 模拟器和 Android 真机。

是否支持原生应用：支持。

是否支持内置移动浏览器：支持(除了使用 Selendroid 后台运行的情况)。通过代理方式绑定到 Chromedriver 来运行自动化测试。在 android4.2 和 4.3 版本中，只有在官方版本的谷歌浏览器或者 Chromium 下才能运行自动化测试。伴随着 android 4.4+版本的出现。自动化测试则可以运行在内置浏览器的应用程序。但是需要在测试设备环境下安装 Chrome/Chromium/浏览器。

是否支持混合应用: 支持。通过默认的 Appium 的后台支持 android 4.4 以上的版本。通过 Selendroid 的后台支持 android 2.3 以上的版本。

是否支持在同一个 session 中执行多个应用的自动化：支持（但是不支持使用 Selendroid 后台的场景）

是否支持同时再多个设备上执行自动化：支持,。尽管 Appium 必须要启动另一个端口即通过添加参数的方式运行命令行，例如--port，--bootstrap-port（或者--selendroid-port）或者--chromedriver-port。

是否支持第三方应用自动化：支持（但是不支持 Selendroid 后台运行的场景）。

是否支持自定义的、非标准 UI 控件的自动化：不支持。

在 windows 系统下运行 Android 项目时，启动 Appium 时请带上--no-reset 或--full-reset 命令。

出现设备连接问题时，运行 adb kill-server && adb devices 是非常有效的。它能够帮助重置和连接 Android 设备。

### iphone

版本号：6.1，7.0，以及 7.1。

支持设备：iPhone 模拟器，iPad 模拟器以及 iPhones 和 iPads 真机。

是否支持原生应用：支持。同时支持模拟器中调试应用版本和正确签名的真机 ipa。其他相关支持由苹果的 UIAutomation 框架提供。

是否支持内置移动浏览器：支持。Safari 浏览器已经通过测试。对于真机，则需要安装调试工具 ios-webkit-remote-debugger。很遗憾，对于 Safari 的原生界面的自动化是不支持的。更多信息请移步至 mobile web doc 。

是否支持混合应用：支持。同样对于真机需要安装调试工具 ios-webkit-remote-debugger，更多详情请移步至 hybrid doc 查看详情。

是否支持在同一个 session 中执行多个应用的自动化：不支持。

是否支持同时再多个设备上执行自动化：不支持。

是否支持第三方提供应用：只支持在模拟器上有限的第三方应用（例如：喜好设置、地图等）。

是否支持自定义的、非标准 UI 控件的自动化：仅支持很少一部分。最好对控件添加可识别信息，以方便对元素进行一些基础的自动化操作。

如果你在 windows 上安装 appium，你没法使用预编译专用于 OS X 的.app 文件，你也将不能测试 IOS apps，因为 appium 依赖 OS X 专用的库来支持 IOS 测试。这意味着你只能通过在 mac 上来运行 IOS 的 app 测试。这点限制挺大。

## appium 的缺点

1、文本框输入速度慢，且不支持中文输入

2、由于设计模式问题，导致执行效率相比原生框架会慢一些

3、XPATH 支持有问题，并不完全支持 xpath 功能

4、可以参考的系统性资料比较少

## Appium 服务命令行参数

-U, --udid : 连接物理设备的唯一设备标识符

-p, --port : 监听的端口(4723)

-bp, --bootstrap-port : (Android-only) 连接设备的端口号(4724)

-g, --log : 将日志输出到指定文件

--log-timestamp : 在终端输出里显示时间戳 (false)

--local-timezone : 使用本地时间戳 (false)

--chromedriver-port : ChromeDriver 运行的端口 (9515)

## 多台设备

如果我们有两台设备，设备ID分别为43364和32456，我们应该用下面的命令启动来两个不同的Appium服务：

appium -p 4723 -bp 4724 --log-timestamp --local-timezone -g "G:\\Project\\wl\\test-appium-master\\appium.log"

appium -p 5723 -bp 5724 -U 127.0.0.1:62025 --log-timestamp --local-timezone -g "D:\\我的站点\\test\\appium\\appium_clone.log"

以小米5MIUI9.8.5.10开发版android8.0为例：

Android System Webview 62.0.3202.84
API level:26
node 8.8.1(推荐)  8.11.0  6.10.3
appium 1.6.4(推荐)  1.7.1
AndroidDriver version: 1.17.1
Java version is: 1.8.0_31
chromedriver 2.3.3(推荐) 2.3.4   2.3.5

PORT:
local_server:3000
appium:4723
bootstrap:4724
chromedriver:8000
adb:5037

## appium启动流程

script => AppiumDriver(create session) => AndroidDriver(drive adb) =>  adb(connect devices & retrieve device api level) => AndroidBootstrap(drive UiAutomator) => UiAutomator(starting => online) => AppiumDriver(get&set contexts) => Chromedriver(starting => online)(create another session) => AppiumDriver(delete session) => shutdown AndroidDriver => stop chromedriver(stopping) => shutdown uiautomator(stopping) => AppiumDriver(check session result)

## appium-androiddriver

类似于appium-iosdriver，它可以作为独立服务运行

自动化模拟器和实际设备上的本地，混合和移动Web应用程序

负责安装Android软件包到设备

如果需要，运行chromedriver会话

包含一组更具体的功能约束

使用appium-adb与emulator/simulator/realdevice进行交互

和appium-android-bootstrap来执行实际的命令

包含帮忙找出哪个网页视图属于哪个应用程序包，反之亦然

## appium-adb

封装 Android Debug Bridge（adb）

包含一些基本的rpc到adb二进制的命令

容纳jar文件来运行特殊用例，例如签名，验证应用程序或移动清单

允许与webdriver协议无关的特殊（移动专用）模拟器命令

锁定屏幕

按返回按钮

按home按钮

设置/获取飞行模式

设置/获取wifi状态

捕获logcat

处理模拟器/模拟器动作（例如重启）

## appium-chromedriver

封装 chromedriver

下载并安装chromedriver二进制文件

启动，重新启动并停止（或杀死所有）chrome实例

使用appium-jsonwp-proxy向驱动程序发送json wire protocol命令

## appium-androidbootstrap

JavaScript界面​​和Java代码，用于与Android UI Automator进行交互

构建包含执行命令的逻辑的AppiumBootstrap.jar

对应的 iOS 上的 appium-uiauto

一旦启动，就会创建一个到设备的web socket连接

应用程序提供启动/关闭/发送命令接口

命令流程如下：
Selenium 命令 - > appium-adb - > appium-androidbootstrap - > 使用Android UI Automator 框架的 Java 代码

## appium-uiautomator

启动和关闭uiautomator服务器由appium-android-bootstrap jar建立

命令流程就像

appium-android-bootstrap:start -> appium-uiautomator:start -> appium-adb:install bootstrap

## appium 方法

```js
  var action = new wd.TouchAction(driver);
  action.tap({el: el, x: 10, y: 10}).release();
  return action.perform(); // returns a promise

  function swipe(opts) {
    var action = new wd.TouchAction(this);
    action
      .press({x: opts.startX, y: opts.startY})
      .wait(opts.duration)
      .moveTo({x: opts.endX, y: opts.endY})
      .release();
    return action.perform();
  }
  wd.addPromiseChainMethod('swipe', swipe);
  return driver.swipe({ startX: 75, startY: 500,endX: 75,  endY: 0, duration: 800 });

  function pinch(el) {
    return Q.all([
      el.getSize(),
      el.getLocation(),
    ]).then(function(res) {
      var size = res[0];
      var loc = res[1];
      var center = {
        x: loc.x + size.width / 2,
        y: loc.y + size.height / 2
      };
      var a1 = new wd.TouchAction(this);
      a1.press({el: el, x: center.x, y:center.y - 100}).moveTo({el: el}).release();
      var a2 = new wd.TouchAction(this);
      a2.press({el: el, x: center.x, y: center.y + 100}).moveTo({el: el}).release();
      var m = new wd.MultiAction(this);
      m.add(a1, a2);
      return m.perform();
    }.bind(this));
  };

  wd.addPromiseChainMethod('pinch', pinch);
  wd.addElementPromiseChainMethod('pinch', function() {
    return this.browser.pinch(this);
  });

  return driver.pinch(el);

  return el.pinch();


  function zoom(el) {
    return Q.all([
      this.getWindowSize(),
      this.getLocation(el),
    ]).then(function(res) {
      var size = res[0];
      var loc = res[1];
      var center = {
        x: loc.x + size.width / 2,
        y: loc.y + size.height / 2
      };
      var a1 = new wd.TouchAction(this);
      a1.press({el: el}).moveTo({el: el, x: center.x, y: center.y - 100}).release();
      var a2 = new wd.TouchAction(this);
      a2.press({el: el}).moveTo({el: el, x: center.x, y: center.y + 100}).release();
      var m = new wd.MultiAction(this);
      m.add(a1, a2);
      return m.perform();
    }.bind(this));
  };

  wd.addPromiseChainMethod('zoom', zoom);
  wd.addElementPromiseChainMethod('zoom', function() {
    return this.browser.zoom(this);
  });

  return driver.zoom(el);
  // ...
  return el.zoom();

  return driver.elementByName().then(function (el) {
    driver.execute("mobile: scroll", [{direction: "down", element: el.value}]);
  });
```

The Selenium Mobile JSON Wire Protocol Specification supports an API for getting and setting the network connection for a device. The API works through a bitmask, assigning an integer to each possible state:(only for android)
Value (Alias)	   Data	   Wifi	   Airplane Mode
0 (None)         	0	      0	          0
1 (Airplane Mode)	0	      0	          1
2 (Wifi only)	    0	      1	          0
4 (Data only)	    1      	0	          0
6 (All network on)1     	1         	0

```js
// set airplane mode
driver.setNetworkConnection(1)
// set wifi only
driver.setNetworkConnection(2)
// set data only
driver.setNetworkConnection(4)
// set wifi and data
driver.setNetworkConnection(6)
Retrieving the network connection settings returns the same bitmask, from which the status can be decoded.

driver.getNetworkConnection().then(function (connectionType) {
  switch (connectionType) {
    case 0:
      // no network connection
      break;
    case 1:
      // airplane mode
      break;
    case 2:
      // wifi
      break;
    case 4:
      // data
      break;
    case 6:
      // wifi and data
      break;
  }
});

var unorm = require('unorm');
'some ASCII text' === unorm.nfd('some ASCII text');
unorm.nfd('Adélaïde Hervé') === unorm.nfd(unorm.nfd('Adélaïde Hervé'));

var unorm = require('unorm');
driver
  .elementByAccessibilityId('find')
    .text()
    .then(function (txt) {
      unorm.nfd(txt).should.be(unorm.nfd("é Œ ù ḍ"));
    });
    AssertionError: expected 'François Gérard' to deeply equal 'François Gérard'
      + expected - actual

      +"François Gérard"
      -"François Gérard"

var unorm = require('unorm');
driver
  .findElementByXPath(unorm.nfd("//UIAButton[@name='Найти']"))
    .should.eventually.exist;

var unorm = require('unorm');
var testText = unorm.nfd("é Œ ù ḍ");
driver
  .elementsByClassName('UIATextField').at(1)
    .sendKeys(testText)
    .text()
    .should.become(testText)
  .nodeify(done);

var desired = {
  app: '/path/to/app',
  deviceName: 'Android Emulator',
  deviceVersion: '4.4',
  platformName: 'Android',
  unicodeKeyboard: true,
  resetKeyboard: true
};
var testText = 'é Œ ù ḍ';
driver
  .elementByClassName('android.widget.EditText')
  .sendKeys(testText)
  .text()
  .should.eventually.become(testText)
  .nodeify(done);

// assuming we have an initialized `driver` object for an app
driver
    .contexts().then(function (contexts) { // get list of available views. Returns array: ["NATIVE_APP","WEBVIEW_1"]
        return driver.context(contexts[1]); // choose the webview context
    })
    // do some web testing
    .elementsByCss('.green_button').click()
    .context('NATIVE_APP') // leave webview context
    // do more native stuff here if we want
   .quit() // stop webdrivage
```
