import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { home } from './home/reducer'

export default createStore(combineReducers({ home }), applyMiddleware(thunk))
