import request from '@/utils/request'

export function uploadGameImage(file, gamerCode, onUploadProgress) {
  const data = new FormData()
  data.append('file', file)

  return request({
    url: '/upload/image/game',
    method: 'post',
    data,
    headers: {
      GamerCode: gamerCode
    },
    onUploadProgress
  })
}
