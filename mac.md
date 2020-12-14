# mac 环境变量

`/etc/profile`  
/etc/paths  
/etc/bashrc(一般在这个文件中添加系统级环境变量）  
~/.bash_profile(建议修改)  
~/.bash_login  
~/.profile  
~/.bashrc  
`修改环境变量`

打开终端，在终端中输入

```shell
cd ~ && ls -a && sudo vim .bashrc
```

通过编辑 启动文件 来改 PATH

```shell
vim /etc/profile
```

当然/etc/profile 和/etc/paths 是系统级别的，系统启动就会加载，后面几个是当前用户级的环境变量。

后面 3 个按照从前往后的顺序读取，如果~/.bash_profile 文件存在，则后面的几个文件就会被忽略不读了

如果~/.bash_profile 文件不存在，才会以此类推读取后面的文件。

~/.bashrc 没有上述规则，它是 bash shell 打开的时候载入的。

1. /etc/paths （全局建议修改这个文件 ）  
   编辑 paths，将环境变量添加到 paths 文件中 ，一行一个路径
   Hint：输入环境变量时，不用一个一个地输入，只要拖动文件夹到 Terminal 里就可以了。

2. /etc/profile （建议不修改这个文件 ）  
   全局（公有）配置，不管是哪个用户，登录时都会读取该文件。

3. /etc/bashrc （一般在这个文件中添加系统级环境变量）  
   全局（公有）配置，bash shell 执行时，不管是何种方式，都会读取此文件。

4. 如果想立刻生效，则可执行下面的语句  
   \$ source 相应的文件

## ios 常用操作命令 VSAndroid 常用操作命令

备注:iOS 用到的 ideviceinstaller，idevicesyslog 等命令安装命令为：brew install libimobiledevice

1. 安装应用（真机）
   `Android`

   ```shell
   adb install xxx.apk
   ```

   `iOS`

   ```shell
   ideviceinstaller -i xxx.ipa
   ```

2. 卸载应用（真机）

   `Android`
   adb uninstall <packageName>

   `iOS`
   ideviceinstaller -U <bundleId>

3. 获取应用唯一标识  
   其实也不算唯一标识了，只是大部分操作会用到。  
   `Android: packageName`  
   获取方式很多，只举其中一个比较容易的：

   ```shell
   apktool d xxx.apk -o xxx
   ```

   $ cd xxx  
   $ cat AndroidManifest.xml | grep -o "package=\".\*\"" | sed "s/package=\"//g" | sed "s/\"//g"
   com.test

   `iOS：bundleId`  
   $ unzip xxx.ipa  
   $ cd Payload/xxx.app  
   \$ defaults read `pwd`/Info CFBundleIdentifier  
   com.test

4. 从源码构建应用安装包  
   这里只举 debug 包

   `android（现在 android studio 项目已经很流行了，所以就不说 ant 了）`  
   $ cd /source-folder/  
   注意：没翻墙情况下貌似不能自动下载 gradle ，那么可以自行下载 gradle 后用 gradle 的 bin 文件代替此处的 gradlew 。  
   $ ./gradlew build  
   build 完的 apk 包放在 Application/build/outputs/apk 中

   `iOS 真机`  
   \$ cd /source-folder/

   \$ PROJECT=<your-project-name>

   $ xcodebuild clean -project $PROJECT.xcodeproj -configuration Debug -alltargets

   $ xcodebuild archive -project $PROJECT.xcodeproj -scheme $PROJECT -archivePath $PROJECT.xcarchive

   注意，末尾的 exportProvisioningProfile 参数值是在 Xcode 的 Performance->Accounts->Apple ID->View Details 窗口的下半部分看到的名称。如 iOS Team Provisioning Profile: chj.ToDoList
   $ xcodebuild -exportArchive -archivePath $PROJECT.xcarchive -exportPath \$PROJECT -exportFormat ipa -exportProvisioningProfile "your provision profile"

   build 完的 ipa 包直接就放在当前目录

5. 查看设备中的应用列表

   `Android`  
    \$ adb shell pm list packages

   package:com.miui.gallery

   package:com.xiaomi.tv.gallerylockscreen  
    ...  
    如果有 drozer 的话能显示得更清晰

   dz> run app.package.list

   com.miui.gallery (图库)

   com.xiaomi.tv.gallerylockscreen (锁屏画报)

   `iOS`  
    \$ ideviceinstaller [-u <device-udid>] -l

   Total: 46 apps

   com.xiaojukeji.didi - 滴滴出行 4.1.5.0

   com.tencent.mqq - QQ 6.0.0.424
   ...

6. 获取真机实时日志
   `Android`
   adb [-s <device-name>] logcat

   `iOS`
   idevicesyslog [-u <device-udid>]

7. 获取当前连接的设备列表  
   `Android`  
   \$ adb devices

   `iOS`  
   注意：这里列出的设备包括模拟器及 mac 电脑本身

   \$ instruments -s devices

   补充：  
    mac 安装以下内容：

   brew install usbmuxd

   brew install ideviceinstaller

   可以获取 ios 手机的 udid

   idevice_id -l

   获取 ios 手机信息

   ideviceinfo

   获取 ios 手机设备名称

   idevicename

   对于脚本中要使用默认设备的场景很方便。
