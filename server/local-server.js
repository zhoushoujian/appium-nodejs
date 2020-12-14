"use strict";

var express = require('express'),
    app = express(),
    path = require('path');

app.use(express.static(__dirname + '/static'));

app.get('/index.html', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../assets/index.html'));
});

app.get('/WebViewApp7.1.app.zip', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../assets/WebViewApp7.1.app.zip'));
}); 

app.get('/huaweiespace.apk', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../config/huaweiespace.apk'));
});

var server;

exports.start = function () {
    server = app.listen(3000);
    console.log('开启服务器端口环境   ok'.blue)
};
exports.stop = function () {
    server.close();
};
