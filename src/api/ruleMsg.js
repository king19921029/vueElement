import request from '@/utils/request'

//8.获取规则组列表接口
export function getRuleList(params) {
  return request({
    url:'/adminUser/v1/queryAdminGroupList',
    method:'post',
    params:params
  })
}
//11.获取规则组详情信息接口
export function getRuleDetails(params) {
  return request({
    url:'/adminUser/v1/getAdminGroupInfoById',
    method:'post',
    params:params
  })
}
//12.新增系统规则组信息接口
export function addAdminGroup(params) {
  return request({
    url:'/adminUser/v1/addAdminGroup',
    method:'post',
    params:params
  })
}
//13.修改系统规则组信息接口
export function updateAdminGroup(params) {
  return request({
    url:'/adminUser/v1/updateAdminGroup',
    method:'post',
    params:params
  })
}
//14.删除系统规则组信息接口
export function delAdminGroup(params) {
  return request({
    url:'/adminUser/v1/delAdminGroup',
    method:'post',
    params:params
  })
}

