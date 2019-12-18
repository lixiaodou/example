import React from 'react'
import { Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from '../store/index'
import Home from '../pages/Home'
import Login from '../pages/Login'

export default (
  <Provider store={store}>
    <div>
      <Route path='/' exact component={Home}></Route>
      <Route path='/login' exact component={Login}></Route>
    </div>
  </Provider>
)
