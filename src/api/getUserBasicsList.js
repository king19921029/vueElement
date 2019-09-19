import request from '@/utils/request'

// 3.获取账户列表信息接口
export function getUserList(params) {
  return request({
    url:'/adminUser/v1/queryAdminUserList',
    method:'post',
    params:params
  })
}
// 4.获取账户详情信息接口
export function getUserDetails(params) {
  return request({
    url:'/adminUser/v1/queryAdminUserInfoById',
    method:'post',
    params:params
  })
}
// 8.获取账户详情信息接口
export function getGroupList(params) {
  return request({
    url:'/adminUser/v1/queryAdminGroupList',
    method:'post',
    params:params
  })
}
// 账户操作日志列表信息接口
export function getUserLogList(params) {
  return request({
    url:'/adminUser/v1/queryAdminUserLogList',
    method:'post',
    params:params
  })
}
// 账户操作日志详情信息接口
export function getUserLogById(params) {
  return request({
    url:'/adminUser/v1/getAdminUserLogById',
    method:'post',
    params:params
  })
}
