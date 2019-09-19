import request from '@/utils/request'

// 15.查询系统权限列表信息接口
//skip（必传，分页参数，起始数，起始为0）
//size（必传，分页参数，每页显示数量）
//adminRoleName（非必传，查询的系统权限名称）
export function queryRoleList(params) {
  return request({
    url:'/adminUser/v1/queryAdminRoleList',
    method:'post',
    params:params
  })
}
// 16.获取系统权限详情信息接口
// adminRoleId（必传，权限的ID）
export function getRoleInfo(params) {
  return request({
    url:'/adminUser/v1/getAdminRoleInfoById',
    method:'post',
    params:params
  })
}
// 17.新增系统规则组信息接口
// adminRoleName（必传，权限名称）
// info（必传，权限说明）
// level（必传，等级,0根目录,1子目录）
// num（必传，排序）
// pid（必传，父节点ID）
// path（必传，vue需要参数）
// redirect（必传，vue需要参数）
// adminRoleObjectName（必传，vue需要参数name）
// component（必传，vue需要参数）
// title（必传，vue需要参数，显示菜单）
// icon（必传，vue需要参数，显示图标）
export function addRole(params) {
  return request({
    url:'/adminUser/v1/addAdminRole',
    method:'post',
    params:params
  })
}
// 18.修改系统权限信息接口
// adminRoleName（必传，权限名称）
// info（必传，权限说明）
// level（必传，等级,0根目录,1子目录）
// num（必传，排序）
// pid（必传，父节点ID）
// path（必传，vue需要参数）
// redirect（必传，vue需要参数）
// adminRoleObjectName（必传，vue需要参数name）
// component（必传，vue需要参数）
// title（必传，vue需要参数，显示菜单）
// icon（必传，vue需要参数，显示图标）
export function updateRole(params) {
  return request({
    url:'/adminUser/v1/updateAdminRole',
    method:'post',
    params:params
  })
}
// 19.删除系统权限信息接口
// adminRoleId（必传，权限的ID）
export function delRole(params) {
  return request({
    url:'/adminUser/v1/delAdminRole',
    method:'post',
    params:params
  })
}
