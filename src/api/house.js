
import request from '@/utils/request'

// 6.查询房屋列表信息接口
// houseDistrictId（非必传，所属小区ID）
// address（非必传，房屋门牌号）
// type（非必传，房屋类型,0开间,1一室一厅一卫,2两室一厅一卫,3三室一厅一卫,4两室一厅两卫,5三室一厅两卫,6四室,7五室）
export function houseList(params) {
  return request({
    url: '/user/v1/queryHouseList',
    method: 'post',
    params: params
  })
}
// 7.查询房屋详情信息接口
// houseId 必传 小区ID
export function houseDetails(params) {
  return request({
    url: '/user/v1/getHouseInfoById',
    method: 'post',
    params: params
  })
}
// 8.新增房屋信息接口
// houseDistrictId（必传，所属小区ID）
// 3.address（必传，房屋具体门牌号）
// 4.area（非必传，房屋面积大小）
// 5.info（非必传，房屋简介）
// 6.type（非必传，房屋类型）
// 7.elevator（非必传，是否有电梯,0没有,1有）
// 8.floor（非必传，楼层）
// 9.aspect（非必传，朝向）
// 10.picList（非必传，房屋图片地址列表，以,分割的字符串）
export function addHouse(params) {
  return request({
    url: '/user/v1/addHouse',
    method: 'post',
    params: params
  })
}
// 9.修改小区接口
// 2.houseDistrictId（必传，所属小区ID）
// 3.address（必传，房屋具体门牌号）
// 4.area（非必传，房屋面积大小）
// 5.info（非必传，房屋简介）
// 6.type（非必传，房屋类型）
// 7.elevator（非必传，是否有电梯,0没有,1有）
// 8.floor（非必传，楼层）
// 9.aspect（非必传，朝向）
// 10.picList（非必传，房屋图片地址列表，以,分割的字符串）
// 11.houseId（必传，房屋ID）
export function updateHouse(params) {
  return request({
    url: '/user/v1/updateHouse',
    method: 'post',
    params: params
  })
}
// 10.删除房屋信息接口
// houseId（必传，删除的小区ID）
export function delHouse(params) {
  return request({
    url: '/user/v1/delHouse',
    method: 'post',
    params: params
  })
}
