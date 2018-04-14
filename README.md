#appium环境搭建

````安装node````  

  根据自己的操作系统选择相应的版本，安装结束在cmd里输入node -v，如果打印出node的版本表示node已经安装成功，输入npm -v打印出npm的版本说明npm安装成功

````配置Android SDK环境````

  安装Android SDK，设置ANDROID_HOME系统变量为你的Android SDK路径：C:\Program Files (x86)\Android\android-sdk；
  把tools和platform-tools两个目录加入到系统path路径：;%ANDROID_HOME%\TOOLS;%ANDROID_HOME%\platform-tools;打开cmd的命令，输入adb，打印出一堆命令提示说明环境变量配置成功

````配置Android jdk环境````

  安装Android jdk，设置JAVA_HOME系统变量为你的Android JDK路径：C:\Program Files\Java\jdk1.8.0_31；
  将bin文件夹和jre\bin文件夹添加到path系统变量：;%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin
  检查java环境是否配置成功，进入cmd输出java或javac，可以看到好多命令提示，说明成功了

````安装appium````

  尽量装最新版的appium（注意：appium需要.net4.0）,然后将C:\Program Files (x86)\Appium\node_modules\\.bin添加到path系统变量
  打开windows命令提示符，通过appium-doctor命令检查appium环境，如果出现“All Checks were successful”的提示，说明基本环境已经搞好。
  
#元素选择器

````1.1通过id定位元素：Android里面定位的id一般为resrouce-id````

````1.2通过name定位元素：一般text属性认为是name````

````1.3通过ClassName定位元素：classname指的是class属性````

````1.4通过xpath定位：WebElement sells = driver.findElement(By.xpath("//android.widget.TextView[contains(@text,'正在售票')]"));````
WebElement movie = driver.findElement(By.xpath("//android.widget.TextView[@text='夜孔雀']"));
WebElement banner =driver.findElement(By.xpath("//android.support.v7.widget.RecyclerView/android.widget.LinearLayout/android.widget.LinearLayout")) ;
WebElement menu_me = driver.findElement(By.xpath("//*[@resource-id='com.gewara:id/side_menu_home']/android.widget.TextView"));

````1.5通过AccessibilityId定位元素：定位元素的方式和name，id一样（content-desc）````


#测试框架的环境搭建

npm install q 

npm install chai 

npm install unorm

npm install colors

npm install express

npm install underscore

npm install chai-as-promised

npm install wd (get appium client)

npm install -g appium(get appium)

npm install --save-dev mocha 最好在全局也安装一次  npm install mocha -g

npm install --save-dev mochawesome 最好在全局也安装一次  npm install mochawesome -g

在测试过程中如果提示mocha不是内部命令也不是外部命令，说明需要配置以下mocha的环境变量


#连接模拟器或真机

````avd模拟器````

  Android SDK自带了avd模拟器，但是性能有些差,不建议使用

````夜神模拟器（推荐）````

  如果模拟器已经启动，请先关闭；再输入adb devices,打印出daemon started successfully说明正常

  将C:\Program Files (x86)\Nox\bin添加到path环境变量，然后在命令行输入nox_adb.exe connect 127.0.0.1:62001,

  再次启动模拟器，输入adb devices可以看到device的udid为127.0.0.1：62001；

  如果遇到：目前运行服务器端的adb版本（也就是夜神模拟器的adb版本）比客户端的版本（也就是SDK目录下的adb版本）低，

  须将SDK目录下的adb.exe文件，复制到夜神模拟器的目录下，并改名nox_adb.exe,重启模拟器再次输入adb devices查看结果

  如果遇到ADB didin't ACK,在cmd输入netstat -ano | findstr "5037",找到对应的pid进程结束它，重新运行adb devices命令

  在cmd中输入 appium -a 127.0.0.1 -p4723 -U4d007e9a1b0050d1 (-a表示ip，-p表示端口，-U表示设备的udid 可以通过appium -h查看更多命令)


````连接真机````

  需要提前安装手机的驱动程序，如果找不到驱动程序就下载360手机助手之类的第三方软件协助安装手机驱动

  装完驱动程序在cmd里输入adb devices可查看手机的UDID

  如果手机系统是Android 7.0及其以上的版本，需要将Android 7.0文件夹里文件覆盖到appium对应的文件夹下

  如测试程序时报错command failed shell “ps ‘uiautomator’”，解决方式：打开Appium\node_modules\appium\node_modules\appium-adb\lib\adb.js

  找到如下代码：
  ```js
  ADB.prototype.getPIDsByName = function (name, cb) {
     logger.debug("Getting all processes with '" + name + "'");
     this.shell("ps '" + name + "'", function (err, stdout) {
     if (err) return cb(err);
     stdout = stdout.trim(); 
     var procs = [];
     var outlines = stdout.split("\n");
  
  在这段代码下面加入这行代码：outlines.shift();
  ````
  ````多台设备
  如果我们有两台设备，设备ID分别为43364和32456，我们应该用下面的命令启动来两个不同的Appium服务：
  node . -p 4492 -bp 2251 -U 32456
  node . -p 4491 -bp 2252 -U 43364
  ````

  
  #appium常用API函数
  ````appium的api
  driver.execute("mobile: scroll", [{direction: 'down'}])
  driver.execute("mobile: scroll", [{direction: 'down', element: element.value}])
  driver.lock(3)
  driver.backgroundApp(5)
  driver.hideKeyboard()
  driver.startActivity({appPackage: 'com.example.android.apis', appActivity: '.Foo'}, cb)
  driver.openNotifications(cb)
  driver.isAppInstalled("com.example.android.apis").then(function (isAppInstalled) { /*...*/ })
  driver.installApp("path/to/my.apk")
  driver.removeApp("com.example.android.apis")
  driver.shake()
  driver.closeApp()
  driver.launchApp()
  driver.resetApp()
  driver.contexts().then(function (contexts) { /*...*/ })
  driver.currentContext().then(function (context) { /*...*/ })
  driver.context()
  driver.getAppStrings().then(function (appStrings) { /*...*/ })
  driver.deviceKeyEvent(wd.SPECIAL_KEYS.Home)
  driver.getCurrentActivity().then(function (activity) { /*...*/ })
  driver.pullFile("Library/AddressBook/AddressBook.sqlitedb").then(function (base64File) { /*...*/ })
  driver.pushFile(path, data)
  ````
```规范中的可用事件```
* 短按 (press)
* 释放 (release)
* 移动到 (moveTo)
* 点击 (tap)
* 等待 (wait)
* 长按 (longPress)
* 取消 (cancel)
* 执行 (perform)

````appium方法````
// javascript
  var action = new wd.TouchAction(driver);
  action.tap({el: el, x: 10, y: 10}).release();
  return action.perform(); // returns a promise

// javascript
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
 //...
 return driver.swipe({ startX: 75, startY: 500,endX: 75,  endY: 0, duration: 800 });

// javascript
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
// ...
return driver.pinch(el);
// ...
return el.pinch();
$this->pinch($el);

// javascript
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
// ...
return driver.zoom(el);
// ...
return el.zoom();

// javascript
return driver.elementByName().then(function (el) {
  driver.execute("mobile: scroll", [{direction: "down", element: el.value}]);
});

The Selenium Mobile JSON Wire Protocol Specification supports an API for getting and setting the network connection for a device. The API works through a bitmask, assigning an integer to each possible state:(only for android)
Value (Alias)	   Data	   Wifi	   Airplane Mode
0 (None)         	0	      0	          0
1 (Airplane Mode)	0	      0	          1
2 (Wifi only)	    0	      1	          0
4 (Data only)	    1      	0	          0
6 (All network on)1     	1         	0 
// javascript
// set airplane mode
driver.setNetworkConnection(1)
// set wifi only
driver.setNetworkConnection(2)
// set data only
driver.setNetworkConnection(4)
// set wifi and data
driver.setNetworkConnection(6)
Retrieving the network connection settings returns the same bitmask, from which the status can be decoded.

// javascript
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

// javascript
var unorm = require('unorm');
'some ASCII text' === unorm.nfd('some ASCII text');
unorm.nfd('Adélaïde Hervé') === unorm.nfd(unorm.nfd('Adélaïde Hervé'));

// javascript
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

// javascript
var unorm = require('unorm');
driver
  .findElementByXPath(unorm.nfd("//UIAButton[@name='Найти']"))
    .should.eventually.exist;

// javascript
var unorm = require('unorm');
var testText = unorm.nfd("é Œ ù ḍ");
driver
  .elementsByClassName('UIATextField').at(1)
    .sendKeys(testText)
    .text()
    .should.become(testText)
  .nodeify(done);

// javascript
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

// javascript
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
#平台支持
````android````
支持版本：android 2.3平台及以上。
支持的设备：Android模拟器和Android真机。
是否支持原生应用：支持。
是否支持内置移动浏览器：支持(除了使用Selendroid后台运行的情况)。通过代理方式绑定到Chromedriver来运行自动化测试。在android4.2和4.3版本中，只有在官方版本的谷歌浏览器或者Chromium下才能运行自动化测试。伴随着android 4.4+版本的出现。自动化测试则可以运行在内置浏览器的应用程序。但是需要在测试设备环境下安装Chrome/Chromium/浏览器。
是否支持混合应用: 支持。通过默认的Appium的后台支持android 4.4以上的版本。通过Selendroid的后台支持android 2.3以上的版本。
是否支持在同一个session中执行多个应用的自动化：支持（但是不支持使用Selendroid后台的场景）
是否支持同时再多个设备上执行自动化：支持,。尽管Appium必须要启动另一个端口即通过添加参数的方式运行命令行，例如--port，--bootstrap-port（或者--selendroid-port）或者--chromedriver-port。
是否支持第三方应用自动化：支持（但是不支持Selendroid后台运行的场景）。
是否支持自定义的、非标准UI控件的自动化：不支持。
在windows系统下运行Android项目时，启动Appium时请带上--no-reset或--full-reset命令。
出现设备连接问题时，运行adb kill-server && adb devices是非常有效的。它能够帮助重置和连接Android设备。
````iphone````
版本号：6.1，7.0，以及7.1。
支持设备：iPhone模拟器，iPad模拟器以及iPhones和iPads真机。
是否支持原生应用：支持。同时支持模拟器中调试应用版本和正确签名的真机ipa。其他相关支持由苹果的UIAutomation框架提供。
是否支持内置移动浏览器：支持。Safari浏览器已经通过测试。对于真机，则需要安装调试工具ios-webkit-remote-debugger。很遗憾，对于Safari的原生界面的自动化是不支持的。更多信息请移步至mobile web doc 。
是否支持混合应用：支持。同样对于真机需要安装调试工具ios-webkit-remote-debugger，更多详情请移步至hybrid doc 查看详情。
是否支持在同一个session中执行多个应用的自动化：不支持。
是否支持同时再多个设备上执行自动化：不支持。
是否支持第三方提供应用：只支持在模拟器上有限的第三方应用（例如：喜好设置、地图等）。
是否支持自定义的、非标准UI控件的自动化：仅支持很少一部分。最好对控件添加可识别信息，以方便对元素进行一些基础的自动化操作。
如果你在windows上安装appium，你没法使用预编译专用于OS X的.app文件，你也将不能测试IOS apps，因为appium依赖OS X专用的库来支持IOS测试。这意味着你只能通过在mac上来运行IOS的app测试。这点限制挺大。

#colors
````js
var colors = require('../lib/index')
console.log("Generic logging theme as JSON".green)  //pass
console.log("debug".blue)  //info
console.log("First some yellow text".yellow)  //warn
console.log("Make it bold and red".red.bold)  //error
console.log('Background color attack!'.black.bgWhite)  //白底黑字
console.log('Use random styles on everything!'.random)  //random color
console.log(("Double Raindows All Day Long").rainbow)  //rainbow

#appium的缺点：
1、文本框输入速度慢，且不支持中文输入
2、由于设计模式问题，导致执行效率相比原生框架会慢一些
3、XPATH支持有问题，并不完全支持xpath功能
4、可以参考的系统性资料比较少