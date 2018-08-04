/**
 * gbk转utf8
 */

// 汉字区　包括          
// GBK/2：OXBOA1-F7FE, 收录 GB 2312 汉字 6763 个，按原序排列；
// GBK/3：OX8140-AOFE，收录 CJK 汉字 6080 个
// GBK/4：OXAA40-FEAO，收录 CJK 汉字和增补的汉字 8160 个。
// 图形符号区　包括
// GBK/1：OXA1A1-A9FE，除 GB 2312 的符号外，还增补了其它符号
// GBK/5：OXA840-A9AO，扩除非汉字区
var fs = require("fs");
var path = require("path");
var src = "./gbk-utf8-unicode-cn.txt";
var data = fs.readFileSync(path.join(__dirname, src)).toString();
var gbk_map = {};
var unicode_map = {};

data.replace(
    // 1 gbk
    // 2 unicode
    // 3 utf8
    // 4 word
    //////  1 /////  2 /////      3        ///// 4 //////
    /^\s*(\w*)\s*(\w*)\s*(\w*\s*\w*\s*\w*)\s*(.*?)\s*$/mg,
    function (match, gbk, unicode, utf8, word) {
        gbk_map[parseInt(gbk, 16)] = word;
        unicode_map[parseInt(unicode, 16)] = word;
        return match;
    }
)
module.exports = function gbk2utf(buffer) {
    var gbks = [], buf;
    buffer = buffer.forEach(function (gbk) {
        if (buf) {
            gbks.push((buf << 8) + gbk);  //左移8位
            buf = 0;
            return;
        }
        if (gbk > 0x7f) {
            buf = gbk;
            return;
        }
        gbks.push(gbk);
    });
    var chars = gbks.map(a => gbk_map[a] || String.fromCharCode(a)).join("");  //通过unicode值返回字符串
    return chars;
}