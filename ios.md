#IOS readme文档
````软件的最佳兼容版本````
1. MacOS版本：10.12.1，要大于10.7
2. Xcode版本：7.3.1兼容Appium，Xcode版本8.2打包，打包版本可以与开发xcode版本号一样，允许装2个Xcode；
3. Xcode command line tools版本：7.3.1与xcode保持一至；
4. Homebrew版本： 终端使用命令下载最最新版本:命令：usr/bin/ruby -e "$(curl-fsSLhttps://raw.githubusercontent.com/Homebrew/install/master/install)"
5. ideviceinstaller版本：终端使用命令下载最新版本；   命令：brew install ideviceinstaller
6. JDK版本：jdk_7u71_macosx-x64.dmg    (java -version)
7. Node.js版本,命令：brew install node (get nodejs)   (node -v)
8. Appium版本：appium-1.5.3.dmg(get appium server)
9. wd：npm install wd (get appium client)
10. git: 命令：brew install git
````js
//修改配置文件: sudo vi ~/.bash_profile  （没有这个文件就新建一个）
export ANDROID_HOME=/Applications/android-sdk-macosx
export APPIUM_HOME=/Applications/Appium.app/Contents/Resources/node_modules/
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_74.jdk/Contents/Home  //注意jdk版本
export AAPT_HOME=/Applications/android-sdk-macosx/build-tools/
export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$APPIUM_HOME/.bin:$AAPT_HOME/23.0.3/  //注意sdk中build-tools版本
//需要立即生效请运行这个命令：source .bash_profile
//检查环境是否安装好了请运行appium-doctor命令（GUI的也可以）
//若使用ios模拟器，记得要在desired里加上noReset：true，否则每次运行用例会自动重启模拟器，安卓貌似不存在这种情况
//模拟器或真机均需要将手机设置—开发者中的 Enable UI Automation启用。
//要使用模拟器安装应用运行，测试包注意target，configruation选择debug。
````

#真机IOS系统版本：9.3.2    不能大于10.0;
````测试App在真机上调试````
满足以下几点：
1. 设置>开发者>Enable UI Automation 打开;
2. 源码导入XCode;
3. 需要developer证书并且将测试机的udid加入到pp(Provisioning Profile)文件，configruation为debug；
4. 编译打包到终端；
注：2〜4不会要可以找IOS开发人员帮助
5. 工程中终端配置启动项
//app bundelid 真机调试,可以问开发要 ;
capabilities.setCapability("app","com.XXX.xxxx.Mxxxchant");
//真机udid 真机调试，连接ITunes可以查到;
UDID:真机的UDID可以在手机的Safri里面输入fir.im/DID获得或者在xcode菜单的window-devices获得
capabilities.setCapability("udid", "3XXXXXXXXXXXXXXX经1");
6. 修改Appium>ios>Basci配置：将App Path前面的勾去掉否则会重新从apps文件装包； 将bundleid，udid写入对应位置；
7. 修改Appium>ios>Advanced配置：将XCode Path:地址指向appium兼容的那个Xcode安装位置；真机测试当前Table要切换为Advanced
8. appium设置设备udid和程序的路径（未安装APP或需要重新安装时），已安装APP设置程序的BundleID即可。

RVM 是干什么的这里就不解释了，后面你将会慢慢搞明白。
$ curl -L https://get.rvm.io | bash -s stable