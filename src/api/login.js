
import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/adminUser/v1/login',
    method: 'post',
    data: data
  })
}

export function getInfo(data) {
  return request({
    url: '/adminUser/v1/getUserRoleList',
    method: 'post',
    data: data
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}
