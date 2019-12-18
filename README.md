# 从头开始创建一个React服务器端渲染项目（包含很多基础部分）

## 初始化项目（以下步骤如嫌繁琐，可以按照自己的方式生成）
1. 项目初始化
```sh
npm init
```
2. 设置git, 并且在项目的根目录创建文件`.gitignore`
```
git init
```
3. 根据自己喜欢的编码风格生成(可以选择跳过)
```
yarn add eslint -D
npx eslint --init
```
4. 设置babel
```
yarn add @babel/core @babel/preset-env @babel/register -d
```
创建文件`.babelrc`
```json
{
  "presets": [
    "@babel/preset-env",
  ]
}
```

## 实现一个基础的SSR
### 直接实现

1. 创建文件
```javascript
// src/server/app.js
import express from 'express'

const PORT = 3001
const app = express()

app.get('/', (req, res) => {
  res.send(`
  <html>
     <head>
       <title>hello</title>
     </head>
     <body>
       <p>hello world</p>
     </body>
   </html>
  `)
})

app.listen(PORT, () => {
  console.log(`listen: ${PORT}`)
})

```

2. 运行文件
```sh
# 检测目录文件更改时通过自动重新启动程序来帮助开发基于node.js的应用程序
yarn add nodemon -D
# 将以下部分添加到package.json中, 方便启动项目
"start": "nodemon src/server/app.js --exec \"node -r @babel/register\""
# 运行
yarn start
```

3. 启动之后打开http://localhost:3001

可以看到页面，这就是一个最简单的服务端渲染。其实很好理解，服务器返回一堆html字符串，然后让浏览器显示。

### SSR vs CSR

## 使用React实现一个基础服务端渲染

1. 首先写一个简单的React组件
```js
// src/pages/Home.js
import React from 'react'

const Home = () => {
  return <div>
    This is Home
  </div>
}

export default Home

```
```sh
# 1. 添加依赖
yarn add react react-dom
# 2. 下载babel
yarn add @babel/preset-react -D
# 3. 添加到文件.babelrc
```
2. 将上面的组件转换成html返回给浏览器, `react-dom` 实现了编译虚拟DOM的方法。
```js
// src/server/app.js
import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'

import Home from '../pages/Home'

const PORT = 3001
const app = express()
const home = renderToString(<Home />)

app.get('/', (req, res) => {
  res.send(`
  <html>
     <head>
       <title>hello</title>
     </head>
     <body>
       <h1>hello</h1>
       <p>world</p>
       <div id="root">${home}</div>
     </body>
   </html>
  `)
})

app.listen(PORT, () => {
  console.log(`listen: ${PORT}`)
})

```

## 认识同构
前面的SSR是不完整的，开发过程中肯定少不了一些事件的绑定