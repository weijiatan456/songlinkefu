import axios from 'axios'
import qs from 'qs'
import {commonParams} from './config'

// 加载订单列表
export function getOrder(page) {
  const data = qs.stringify(Object.assign({}, commonParams, {'nums': page}))
  const url = '/wap/svip-jiazhai_order.html'
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 搜索订单
export function getSearchOrder(id) {
  const data = qs.stringify(Object.assign({}, commonParams, {'order_id': id}))
  const url = '/wap/svip-kefu_order.html'
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 加载订单明细
export function getOrderDetail(id) {
  const data = qs.stringify({'order_id': id})
  const url = '/wap/svip-order_items.html'
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}