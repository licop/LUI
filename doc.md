# LUI

typescript 开发的 react 组件库

避免刚开始过度设计，一步一步根据需求完善自己的组件

### 完成一个组件库需要考虑哪些问题

- 代码结构
- 样式解决方案
- 组件需求分析和编码
- 组件测试用例分析和编码
- 代码打包输出和发布
- CI/CD, 文档生成

### 样式解决方案

- Inline CSS
- CSS in JS
- Style Component
- Sass/Less(推荐)

#### 样式目录结构

- styles/
  - \_variables.scss (各种变量以及可配置设置)
  - \_mixins.scss (全局 mixins)
  - \_function.scss(全局 function)

### 创建自己的色彩体系

- 系统色板 - 基础色板 + 中性色板
- 产品色板 - 品牌色 + 功能色板

### 组件库样式变量分类

- 基础色彩系统
- 字体系统
- 表单
- 按钮
- 边框和阴影
- 可配置变量开关

### 使用 normallize.css

- 使 HTML 元素在样式上在各个浏览器保持的高度一致性

### 添加单元测试

- 使用 create-react-app 自带的 jest，jest-dom，@testing-library/react

### 图标 icon 解决方案

- 使用 svg 格式
- react-fontawesome
- react-fontawesome 项目安装

```
  npm i --save @fortawesome/fontawesome-svg-core
  npm install --save @fortawesome/free-solid-svg-icons
  npm install --save @fortawesome/react-fontawesome
```

- 使用 scss 的 each 功能为 icon 添加主题

### 动画效果

- 使用 react-transition-group 库
- 动画参考效果 animate.css
- 编写 transition 组件实现动画效果的复用

### 本地调试组件&生成文档

- create-react-app 入口文件不适合管理组件库
- 缺少行为追踪和属性调试功能
- storybook
  - 能分开展示各个组件不同属性下的状态
  - 能追踪组件的行为并且具有调试功能
  - 可以为组件自动生成文档和属性列表
- react-docgen 自动生成文档

### 上传组件

#### 上传流程

开始上传 --> beforeUpload(file) --> onProgress(event, file) --> onChange(file) --> onSuccess(response, file) or onError(error, file)

#### 异步请求

- 以前 --> 原生 XHR 和$.ajax(), $.ajax()是对 XHR 的封装
- XHR API

```

  const xhr = new XMLHttpRequest();
  xhr.open('get', 'http://test.me');
  xhr.responseType = 'json';

  xhr.onload = function() {
    console.log(xhr.response);
  }
  xhr.onerror = function() {
    console.log("oop, error");
  }
  xhr.send()

```

- fetch 缺点

  - 只对网络请求报错, 对 400， 500 都当做成功的请求
  - 默认不会带 cookie
  - 不支持 abort，不支持超时控制
  - 没有办法原生监测请求进度

- 在线 mock server
  - [mocky](https://designer.mocky.io/design/confirmation)
  - [jsonplaceholder](https://jsonplaceholder.typicode.com/)
- 文件上传
  - 两种上传方式： 表单提交 & javascript 发送异步请求

### 模块 modules

- commonjs(服务端，nodejs), amd(require.js), es6 module(更强大， import export)
- webpack（modules bundler）
- typescript.tsx --tsc--> es6 modules.jsx --> 入口文件 index.tsx --module bundler--> 浏览器使用一个多个 js 文件
- 为什么 ES 模块比 CommonJS 更好?
  ES 模块是官方标准，也是 JavaScript 语言明确的发展方向，而 CommonJS 模块是一种特殊的传统格式，在 ES 模块被提出之前做为暂时的解决方案。 ES 模块允许进行静态分析，从而实现像 tree-shaking 的优化，并提供诸如循环引用和动态绑定等高级功能。

### 本地测试组件

- npm link

### npm

- 下载别人编写的第三方包到本地使用
- 下载并安装别人编写的命令行程序到本地使用
- 将自己编写的包和命令行程序上传到 npm 服务器
- 更换源 npm --registry=https://registry.npmjs.org
- npm publish --access public

https://shields.io/

### ci/cd

- 持续集成（ci）

  - 频繁的将代码集成到主干
  - 快速发现错误
  - 防止分支大幅偏离主干

- 持续交付、持续部署（cd）

  - 频繁的将软件的新版本，交付给质量团队或者用户
  - 代码通过评审以后，自动部署到生产环境

- travis

### 相关链接

- [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
