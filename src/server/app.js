import express from 'express'

import { render } from './utils'

const PORT = 3001
const app = express()

app.use(express.static('public'))

app.get('*', function (req, res) {
  res.send(render(req))
})

app.listen(PORT, () => {
  console.log(`listen: ${PORT}`)
})
