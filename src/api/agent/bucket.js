import request from '@/utils/request'

export function listBucketPath(data) {
  return request({
    url: '/bucket/path/list',
    method: 'post',
    data
  })
}

export function uploadBucketFile(file, dirPath, onUploadProgress) {
  const formData = new FormData()
  formData.append('file', file)

  return request({
    url: '/bucket/file/upload',
    method: 'post',
    params: {
      dirPath: dirPath || ''
    },
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress
  })
}

export function deleteBucketFile(objectKey) {
  return request({
    url: '/bucket/file/delete',
    method: 'post',
    data: {
      objectKey
    }
  })
}
