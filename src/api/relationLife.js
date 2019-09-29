import request from '@/utils/request'

// 21.查询用户生活记录信息列表接口
// 4.userId（必传，用户ID）
// 5.beginTime（非必传，开始时间）
// 6.endTime（非必传，结束时间）
// 7.recordAdminUserId（非必传，记录人ID）
export function queryUserLifeHistoryList(params) {
  return request({
    url: '/user/v1/queryUserLifeHistoryList',
    method: 'post',
    params: params
  })
}

// 22.查询用户生活记录详情接口
// 2.userLifeHistoryId（必传，关联关系ID）
export function getUserLifeHistoryInfoById(params) {
  return request({
    url: '/user/v1/getUserLifeHistoryInfoById',
    method: 'post',
    params: params
  })
}
// 23.新增用户生活记录信息接口
// 2.userId（必传，用户ID）
// 3.recordAdminUserId（必传，记录人ID）
// 4.recordTime（必传，记录时间）
// 5.familyInfo（非必传，家庭情况）
// 6.petInfo（非必传，宠物情况）
// 7.detailList（非必传，动态内容列表，ArrayList）
//     6.1.pKey（动态详情key）
//     6.2.pValue（动态详情value）
export function addUserLifeHistory(params) {
  return request({
    url: '/user/v1/addUserLifeHistory',
    method: 'post',
    params: params
  })
}
// 24.修改用户生活记录信息接口
// 2.userLifeHistoryId（必传，生活记录ID）
// 3.recordAdminUserId（必传，记录人ID）
// 4.recordTime（必传，记录时间）
// 5.familyInfo（非必传，家庭情况）
// 6.petInfo（非必传，宠物情况）
// 7.detailList（非必传，动态内容列表，ArrayList）
//     6.1.pKey（动态详情key）
//     6.2.pValue（动态详情value）

export function updateUserLifeHistory(params) {
  return request({
    url: '/user/v1/updateUserLifeHistory',
    method: 'post',
    params: params
  })
}
// 25.删除用户生活记录详情接口
// userLifeHistoryId（必传，关联关系ID）
export function delUserLifeHistory(params) {
  return request({
    url: '/user/v1/delUserLifeHistory',
    method: 'post',
    params: params
  })
}
