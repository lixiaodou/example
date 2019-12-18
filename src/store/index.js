import { combineReducers, createStore } from 'redux'
import { home } from './home/reducer'

export default createStore(combineReducers({ home }))
