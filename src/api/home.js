import { baseAxios } from './index'

export const fetchHomeList = (params) => {
  return baseAxios({
    url: '/fetchHomeList',
    type: 'GET',
    params
  })
}
