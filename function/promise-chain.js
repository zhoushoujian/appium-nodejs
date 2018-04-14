'use strict'
var actions = require("./actions")
wd.addPromiseChainMethod('login', actions.login)
wd.addPromiseChainMethod('login_clone', actions.login_clone)
wd.addPromiseChainMethod('swipe', actions.swipe)
wd.addPromiseChainMethod('pinch', actions.pinch)
wd.addPromiseChainMethod('zoom', actions.zoom)
wd.addPromiseChainMethod('friendsStates', actions.friendsStates)
console.log("初始化自定义方法   ok".green)