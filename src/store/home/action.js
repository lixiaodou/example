import { fetchHomeList } from '../../api/home'

export const ADD_ITEM = 'ADD_ITEM'
export const ADD_ITEMS = 'ADD_ITEMS'

// action创建函数
export function addItem(item) {
  return {
    type: ADD_ITEM,
    text: item
  }
}

export function addItems(items) {
  return {
    type: ADD_ITEMS,
    text: items
  }
}

export const getHomeList = (payload) => {
  return dispatch => {
    return fetchHomeList()
      .then(res => {
        dispatch(addItems(res.data))
      })
  }
}
