// 报表管理接口
import request from '@/utils/request'
import axios from 'axios'
import { domain } from "@/utils/domain";
const currentDomain = document.domain;
const selectedBaseURL = domain[currentDomain] || process.env.VUE_APP_BASE_API;

// 代理报表
export function getAgentPages({ pageNo, pageSize, agentId, endDay, startDay }) {
  return request({
    url: '/report/agent',
    method: 'get',
    params: { pageNo, pageSize, agentId, endDay, startDay }
  })
}

// 下级代理明细
export function getaAentDetailPages(data) {
  return request({
    url: '/report/agentDetail',
    method: 'post',
    data
  })
}

// 游戏商报表
export function getGamerPages({ pageNo, pageSize, gamerId, endDay, startDay }) {
  return request({
    url: '/report/gamer',
    method: 'get',
    params: { pageNo, pageSize, gamerId, endDay, startDay }
  })
}
// 会员报表
export function getMemberPages({ pageNo, pageSize, memberId, endDay, startDay }) {
  return request({
    url: '/report/member',
    method: 'get',
    params: { pageNo, pageSize, memberId, endDay, startDay }
  })
}
// 平台报表
export function getPlatformPages({ pageNo, pageSize, endDay, startDay }) {
  return request({
    url: '/report/plantform',
    method: 'get',
    params: { pageNo, pageSize, endDay, startDay }
  })
}

// 会员投注表
export function getaMemberBetPages(data) {
  return request({
    url: '/report/memberBet',
    method: 'post',
    data
  })
}

// 代理报表活动金额详情
export function getActivityInfo(params) {
  return request({
    url: '/report/agent/activityInfo',
    method: 'GET',
    params
  })
}

// 代理报表平台费用详情
export function getGamerInfo(params) {
  return request({
    url: '/report/agent/gamerInfo',
    method: 'GET',
    params
  })
}

// 导出平台报表excel
export function reportOutput(params) {
  return axios({
    url: selectedBaseURL + '/report/output',
    method: 'GET',
    params,
    responseType: 'blob'
  })
}

//存提报表
export function getReportIncomeCash(data) {
  return request({
    url: '/report/incomeCash',
    method: 'POST',
    data
  })
}

//直播报表
export function getReportLiveStream(data) {
  return request({
    url: '/report/liveStream/report',
    method: 'POST',
    data
  })
}

//直播报表详情
export function getReportLiveStreamInfo(data) {
  return request({
    url: '/report/liveStream/report/info',
    method: 'POST',
    data
  })
}