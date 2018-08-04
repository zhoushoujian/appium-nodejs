'use strict'
let item_reg = /^\s*set\s+([^\s]+)\s*=([\s\S]*)$/im;
let call_reg = /^\s*call\s+([\s\S]+?)\s*$/im
let env = process.env;
var fs = require("fs");
var path = require("path");
var gbk2utf8 = require("./gbk2utf8");
var file = path.resolve(__dirname, '../config/setup.bat')
add(file)

function get(v, file) {
    return v
        .replace(/%~dp0/ig, path.join(path.parse(file).dir, "./"))
        .replace(/%.*?%/g, function (match) {
            if (match.length === 2) {
                return "%";
            } else {
                return env[match.slice(1, match.length - 1)];
            }
        });
}

function add(file) {
    gbk2utf8(fs.readFileSync(file))
        .split(/[\r\n]+/g)
        .filter(function (a) {
            return item_reg.test(a) || call_reg.test(a);
        })
        .forEach(function (a) {
            //console.log(a)
            var match = a.match(call_reg);
            if (match) {
                var new_file = get(match[1], file);
                var exts = ["bat", "cmd", "sh"];
                var ext = "";
                do {
                    var filename = ext ? new_file + "." + ext : new_file;
                    if (fs.existsSync(filename) && fs.statSync(filename).isFile()) {
                        return add(filename);
                    }
                } while (ext = exts.shift())
                return;
            }
            var matchs = a.match(item_reg);
            var key = matchs[1];
            var value = get(matchs[2], file);
            env[key] = value;
        });
}
global.logger = require('../exploit/logger')
console.info("关联系统临时变量 ok".green)
