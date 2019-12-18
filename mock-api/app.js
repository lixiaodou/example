import express from 'express'
import fetchHomeList from './json/fetchHomeList'

const PORT = 3003
const app = express()

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  if (req.method === 'OPTIONS') res.send(200) // 让options请求快速返回
  else next()
})

app.get('/fetchHomeList', function (req, res) {
  res.json(fetchHomeList)
})

app.listen(PORT, () => {
  console.log(`listen:${PORT}`)
})
