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
前面的SSR是不完整的，开发过程中肯定少不了一些事件的绑定，添加一个button
```js
// src/pages/Home.js
import React from 'react'

const Home = () => {
  return <div>
    This is Home
    <button onClick={() => { alert('this is home button') }}>click</button>
  </div>
}

export default Home

```
试一下上面的代码，是不是发现事件绑定无效呢？这是因为`renderToString`并没有做事件相关的处理，因此返回给浏览器的内容不会有事件绑定。

这就需要进行同构了。所谓同构，通俗的讲，就是一套React代码再服务器上运行一遍，在浏览器又运行一遍。服务端渲染完成页面结构，浏览器端渲染完成事件驱动。

如何进行浏览器端的事件绑定呢？唯一的方法就是让浏览器去拉去JS文件执行，生成js文件
```js
// clients/index.js
import React from 'react'
import ReactDom from 'react-dom'
import Home from '../pages/Home'

ReactDom.hydrate(<Home />, document.getElementById('root'))
```
配置webpack，使用webpack将其打包
```sh
yarn add babel-loader webpack webpack-cli -D
# 添加指令 "build:client": "webpack --watch"

```
```js
// webpack.config.js
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        presets: ['@babel/preset-react', ['@babel/preset-env', {
          targets: {
            browsers: ['last 2 versions']
          }
        }]]
      }
    }]
  }
}

```
开启express的静态文件服务，并将返回前端的html字符串中添加js文件
```js
// src/server/app.js
app.use(express.static('public'))

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
       <script src="main.js"></script>
     </body>
   </html>
  `)
})
```
