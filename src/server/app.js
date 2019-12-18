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
