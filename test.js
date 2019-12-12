/*
 * @Description: 测试js
 * @Author: 吴文周
 * @Github: http://gitlab.yzf.net/wuwenzhou
 * @Date: 2019-11-26 17:03:59
 * @LastEditors: 吴文周
 * @LastEditTime: 2019-12-12 19:04:43
 */
var liveServer = require("./index");

var params = {
  port: 8181, // Set the server port. Defaults to 8080.
  middleware: {}, // 尚未开发
  proxy: {
    "/xx": {
      target: 'http://xx/'
    }
  }
};
liveServer.start(params);