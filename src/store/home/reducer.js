import { ADD_ITEM } from './action'

export function home(state = ['default'], action) {
  switch (action.type) {
    case ADD_ITEM:
      return [
        ...state,
        action.text
      ]
    default:
      return state
  }
}
