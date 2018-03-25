"use strict"
const fs = require('fs');
const os=require('os')
const year = new Date().getFullYear()
const month = new Date().getMonth() + 1
const day = new Date().getDate()
const hour = new Date().getHours()
const minute = new Date().getMinutes()
const second = new Date().getSeconds()
const time = `${year}-${month}-${day} ${hour}:${minute}:${second} `
const operationPlatform = process.platform;  //获取操作系统平台，如win32
const operationCore = os.type()     //获取操作系统内核版本，如windows_NT
const operationArch = process.arch;   //获取系统架构，如x64
const operationInfo = `${operationPlatform}_${operationCore}_${operationArch}`
const userName = process.env.USERPROFILE;
//获取ip地址
const networkInterfaces = os.networkInterfaces()
var address;
Object.keys(networkInterfaces).forEach(function (m) {
    for (let n in networkInterfaces[m]) {
        if (networkInterfaces[m][n].family === "IPv4" && networkInterfaces[m][n].address !== "127.0.0.1") {
            address = networkInterfaces[m][n].address;
            return address;
        }
    }
})
const cpuCoreNumber = os.cpus().length  //获取cpu核心（线程）
const cpuModel = os.cpus()[0].model    //获取cpu型号
const cpuSpeed = os.cpus()[0].speed;    //获取cpu主频
const cpuInfo = `${cpuModel}_${cpuCoreNumber} core_${cpuSpeed}MHZ`;
//打印日志模块
fs.appendFile("log.txt", `${time} \r\n ${operationInfo} \r\n ${address} \r\n ${userName} \r\n ${cpuInfo} `, {
    encoding: "utf8"
}, function () {
    console.log('process.pid-basic',process.pid)
});
exports.configure = function (driver) {
    // See whats going on
    driver.on('status', function (info) {
      fs.appendFile("appiumLog.log", `\r\n ${time} \r\n ${info.cyan} \r\n `, {
        encoding: "utf8"
    }, function () {
        console.log('process.pid-basic',process.pid)
    });
    });
    driver.on('command', function (meth, path, data) {
      fs.appendFileSync("appiumLog.log", `\r\n ${time} ${meth.yellow} \r\n ${path.grey} \r\n ${data} \r\n `);
    });
    driver.on('http', function (meth, path, data) {
      fs.appendFileSync("appiumLog.log", `\r\n ${time} ${ meth.magenta} \r\n ${path} \r\n `);
      //console.log(' > ' + meth.magenta, path, (data || '').grey);
    });
  };

