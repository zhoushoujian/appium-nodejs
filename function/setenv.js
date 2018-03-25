var item_reg = /^\s*set\s+([\S]+)\s*=([\s\S]*)$/im
var fs = require("fs")
var path = require('path')
var file = path.resolve(__dirname,'../config/setup.bat')
add(file)
/* var WELINK_LOCALATION = process.env['welink_install_location']
if (!fs.existsSync(WELINK_LOCALATION)){
    console.log('系统变量配置不正确'.yellow)
    process.exit(0)
} */
function get(v,file){
    return v.replace(/%~dp0/gi,path.join(path.parse(file).dir,'./'))
            .replace(/%.*?%/gi,function(match){
                return process.env[match.slice(1,match.length-1)]
            })
}
function add(file){
         fs.readFileSync(file).toString()
            .split(/[\r\n]+/g)
            .filter(function(a){
                //console.log(item_reg.test(a))
               return item_reg.test(a)
            })
            .forEach(function(a){
                let matches = a.match(item_reg)
                let key = matches[1]
                //console.log(key)
                //console.log(matches[0])
                //console.log(matches[2])
                let value = get(matches[2],file)
                process.env[key] = value
                //console.log(value)
            })
}
console.log('关联系统环境变量  ok'.green)