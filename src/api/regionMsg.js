
import request from '@/utils/request'

// 1.小区信息列表接口
// houseDistrictName（非必传，小区名称）
// address（非必传，小区地址）
export function houseListReg(data) {
  return request({
    url: '/user/v1/queryHouseDistrictList',
    method: 'post',
    data: data
  })
}
// 2.小区详情信息接口
// houseDistrictId 必传 小区ID
export function houseDetailsReg(data) {
  return request({
    url: '/user/v1/getHouseDistrictInfoById',
    method: 'post',
    data: data
  })
}
// 3.新增小区接口
// houseDistrictName（必传，小区名称）
// address（必传，小区地址）
// buildTime（非必传，小区建造时间）
// isDoorGuard（非必传，是否有门禁,0没有,1有）
// info（非必传，小区介绍）
// picList（非必传，小区图片地址列表，以,分割的字符串）
export function addHouseReg(data) {
  return request({
    url: '/user/v1/addHouseDistrict',
    method: 'post',
    data: data
  })
}
// 4.修改小区接口
// houseDistrictName（必传，小区名称）
// address（必传，小区地址）
// buildTime（非必传，小区建造时间）
// isDoorGuard（非必传，是否有门禁,0没有,1有）
// info（非必传，小区介绍）
// picList（非必传，小区图片地址列表，以,分割的字符串）
// houseDistrictId 必传 小区ID
export function updateHouseReg(data) {
  return request({
    url: '/user/v1/updateHouseDistrict',
    method: 'post',
    data: data
  })
}
// 5.小区信息列表接口
// houseDistrictId（必传，删除的小区ID）
export function delHouseReg(data) {
  return request({
    url: '/user/v1/delHouseDistrict',
    method: 'post',
    data: data
  })
}
