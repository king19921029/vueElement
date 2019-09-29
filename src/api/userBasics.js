
import request from '@/utils/request'
// 11.查询用户基础列表信息接口
// nickname（非必传，用户昵称）
// userRealName（非必传，用户真实姓名）
// phone（非必传，手机号）
// sex（非必传，性别）
// weixin（非必传，微信号）
// userNo（非必传，用户编号）
export function queryUserList(params) {
  return request({
    url: '/user/v1/queryUserList',
    method: 'post',
    params: params
  })
}
// 12.查询用户基础详情信息接口
// userId 必传 用户ID
export function getUserInfoById(params) {
  return request({
    url: '/user/v1/getUserInfoById',
    method: 'post',
    params: params
  })
}
// 13.新增用户基础信息接口
// userRealName（非必传，用户真实姓名）
// sex（必传，性别,0男,1女）
// nickname（非必传，用户昵称）
// birthday（非必传，用户生日）
// phone（非必传，手机号）
// headerPicUrl（非必传，头像地址）
// weixin（非必传，用户的微信号）
export function addUser(params) {
  return request({
    url: '/user/v1/addUser',
    method: 'post',
    params: params
  })
}
// 14.修改用户基础信息接口
// userRealName（非必传，用户真实姓名）
// sex（必传，性别,0男,1女）
// nickname（非必传，用户昵称）
// birthday（非必传，用户生日）
// phone（非必传，手机号）
// headerPicUrl（非必传，头像地址）
// weixin（非必传，用户的微信号）
// userId（必传，用户ID）
export function updateUser(params) {
  return request({
    url: '/user/v1/updateUser',
    method: 'post',
    params: params
  })
}
// 10.删除用户基础信息接口
// userId（必传，删除的用户ID）
export function delUser(params) {
  return request({
    url: '/user/v1/delUser',
    method: 'post',
    params: params
  })
}
