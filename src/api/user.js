import request from '@/utils/request'

export function createUser(params) {
  return request({
    url:'/adminUser/v1/addAdminUser',
    method:'post',
    params:params
  })
}

export function updateUser(params) {
  return request({
    url:'/adminUser/v1/updateAdminUser',
    method:'post',
    params:params
  })
}

export function delUser(params) {
  return request({
    url:'/adminUser/v1/delAdminUser',
    method:'post',
    params:params
  })
}

