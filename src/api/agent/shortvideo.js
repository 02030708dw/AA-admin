import axios from 'axios'
import request from '@/utils/request'

export function listShortVideos(params) {
  return request({
    url: '/shotvideo/page',
    method: 'get',
    params
  })
}

export function addShortVideo(data) {
  return request({
    url: '/shotvideo/add',
    method: 'post',
    data
  })
}

export function editShortVideo(data) {
  return request({
    url: '/shotvideo/edit',
    method: 'post',
    data
  })
}

export function deleteShortVideo(id) {
  return request({
    url: '/shotvideo/del',
    method: 'post',
    data: {
      id
    }
  })
}

export function listLotteryGames() {
  return axios.get('https://newgwadmin1.gw1238.online/game/gameInfo/listAll', {
    timeout: 60000
  }).then((response) => response.data)
}
