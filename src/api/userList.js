import request from '@/utils/request'

export function getUserList() {
  return request({
    url:'/adminUser/v1/queryAdminUserList',
    method:'post'
  })
}
