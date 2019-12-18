import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from '../store/index'
import Routes from '../routes/index'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {Routes}
      </BrowserRouter>
    </Provider>
  )
}

ReactDom.hydrate(<App />, document.getElementById('root'))
