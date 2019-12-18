import { ADD_ITEM, ADD_ITEMS } from './action'

export function home(state = ['default'], action) {
  switch (action.type) {
    case ADD_ITEM:
      return [
        ...state,
        action.text
      ]
    case ADD_ITEMS:
      return [
        ...state,
        ...action.text
      ]
    default:
      return state
  }
}
