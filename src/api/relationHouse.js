import request from '@/utils/request'

// 16.查询用户与房屋关联信息列表接口
// 4.userId（必传，用户ID）
// 5.houseDistrictId（非必传，小区ID）
// 6.address（非必传，门牌号）
// 7.type（非必传，房屋类型）
export function queryUserHouseRelationList(params) {
  return request({
    url: '/user/v1/queryUserHouseRelationList',
    method: 'post',
    params: params
  })
}

// 17.查询用户与房屋关联信息详情接口
// 2.userHouseRelationId（必传，关联关系ID）
export function getUserHouseRelationInfoById(params) {
  return request({
    url: '/user/v1/getUserHouseRelationInfoById',
    method: 'post',
    params: params
  })
}
// 18.新增用户与房屋关联信息接口
// 2.userId（必传，用户ID）
// 3.houseId（必传，房屋ID）
// 4.enterTime（非必传，入住时间）
// 5.type（非必传，住房类型，0租房,1自住）
export function addUserHouseRelation(params) {
  return request({
    url: '/user/v1/addUserHouseRelation',
    method: 'post',
    params: params
  })
}
// 19.修改用户与房屋关联信息接口
// 2.userId（必传，用户ID）
// 3.houseId（必传，房屋ID）
// 4.enterTime（非必传，入住时间）
// 5.type（非必传，住房类型，0租房,1自住）
export function updateUserHouseRelation(params) {
  return request({
    url: '/user/v1/updateUserHouseRelation',
    method: 'post',
    params: params
  })
}
// 20.删除用户与房屋关联信息接口
// userHouseRelationId（必传，关联关系ID）
export function delUserHouseRelation(params) {
  return request({
    url: '/user/v1/delUserHouseRelation',
    method: 'post',
    params: params
  })
}

// 26.查询用户房屋记录信息列表接口
// 4.userId（必传，用户ID）
// 5.beginTime（非必传，开始时间）
// 6.endTime（非必传，结束时间）
// 7.recordAdminUserId（非必传，记录人ID）
// 8.houseId（必传，房屋ID）
export function queryUserHouseHistoryList(params) {
  return request({
    url: '/user/v1/queryUserHouseHistoryList',
    method: 'post',
    params: params
  })
}
// 27.查询用户房屋记录详情接口
// userHouseHistoryId（必传，房屋记录ID）
export function getUserHouseHistoryInfoById(params) {
  return request({
    url: '/user/v1/getUserHouseHistoryInfoById',
    method: 'post',
    params: params
  })
}

// 28.新增用户房屋记录信息接口
// 3.houseId（必传，房屋ID）
// 4.recordAdminUserId（必传，记录人ID）
// 5.recordTime（必传，记录时间）
// 6.detailList（非必传，动态内容列表，ArrayList）
//     6.1.pKey（动态详情key）
//     6.2.pValue（动态详情value）
export function addUserHouseHistory(params) {
  return request({
    url: '/user/v1/addUserHouseHistory',
    method: 'post',
    params: params
  })
}

// 29.修改用户房屋记录信息接口
// 2.userHouseHistoryId（必传，房屋记录ID）
// 3.recordAdminUserId（必传，记录人ID）
// 4.recordTime（必传，记录时间）
// 5.detailList（非必传，动态内容列表，ArrayList）
//     6.1.pKey（动态详情key）
//     6.2.pValue（动态详情value）
export function updateUserHouseHistory(params) {
  return request({
    url: '/user/v1/updateUserHouseHistory',
    method: 'post',
    params: params
  })
}

// 30.删除用户房屋记录详情接口
// userHouseHistoryId（必传，房屋记录ID）
export function delUserHouseHistory(params) {
  return request({
    url: '/user/v1/delUserHouseHistory',
    method: 'post',
    params: params
  })
}




