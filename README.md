# LUI

typescript 开发的 react 组件库

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

### 相关链接

- [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
