<h2 align="center">
能重复的工作以后必然会自动化，也终将自动化
</h2>
<h3 align="center">
根据接口自动生成代码模板的小工具
</h3>
<p>
   PS:此项目本人娱乐为主，通过可视化的方式选择文件目录，上传模板，选择接口数据，根据模板生成代码，当前已经实现swagger生成TS的内置需求
</p>
<p>
基于Vue开发
</p>
<p>
Can automate repetitive tasks in the future will inevitably, these will be automated
</p>
<p>
全部开源
</p>

### Links/相关链接

掘金 https://juejin.im/post/5dca0449f265da4d114013b1


### 前端代码地址

web https://github.com/fodelf/generateTemplate

### Features

1. 支持场景

   - [x] swagger ts
   - [ ] mysql
   - [ ] restful

2. 支持功能

   - [x] 生成代码
   - [ ] 生成项目结构

#### 技术栈（当前）

1. 前端：[Vue.js]
2. 后端：[nodejs]

## Project setup

```
npm install  generate-ui --save-dev
```

## Add generate JS 

```
var liveServer = require("generate-ui");

var params = {
  port: 8181, // Set the server port. Defaults to 8080.
  middleware: {}, // 尚未开发
  proxy: {       // 配置swagger 查询接口代理转发
    "/api": {
      target: 'http://xx/'
    }
  }
};
liveServer.start(params);
```
## Start

```
node generate.js

or npm  run  generate

```
## Thanks
```
https://github.com/vuejs/vue-cli

https://github.com/tapio/live-server
```