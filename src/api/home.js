import axios from 'axios'
import qs from 'qs'
import {commonParams} from './config'

export function getHome() {
  const url = '/wap/svip-member_info.html'
  return axios.get(url, {
    params: commonParams
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function addTag(tag){
  const data = qs.stringify(Object.assign({}, commonParams, {'label': tag}))
  const url = '/wap/svip-kefu_label.html'
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}


export function cancleTag(id){
  const url = '/wap/svip-cancel_label.html'
  const data = qs.stringify(Object.assign({}, commonParams, {'label_id': id}))
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function addBeizhu(tag){
  const data = qs.stringify(Object.assign({}, commonParams, {'remarks': tag}))
  const url = '/wap/svip-kefu_remarks.html'
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function delBeizhu(id){
  const url = '/wap/svip-cancel_remarks.html'
  const data = qs.stringify(Object.assign({}, commonParams, {'rec_id': id}))
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 员工绑定工号
export function staffAjax(id){
  const url = '/wap/svip-kefu_staff.html'
  const data = qs.stringify(Object.assign({}, commonParams, {'usercode': id}))
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}