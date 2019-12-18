// 创建action常量
export const ADD_ITEM = 'ADD_ITEM'

// action创建函数
export function addItem(item) {
  return {
    type: ADD_ITEM,
    text: item
  }
}
