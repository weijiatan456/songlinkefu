import axios from 'axios'
import qs from 'qs'
import {commonParams} from './config'

export function getList(name){
  const data = qs.stringify(Object.assign({}, commonParams, {'goods': name}))
  const url = '/wap/svip-kefu_goods.html'
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSearchResult(name) {
  const data = qs.stringify(Object.assign({}, commonParams, {'goods': name}))
  const url = '/wap/svip-kefu_goods.html'
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}