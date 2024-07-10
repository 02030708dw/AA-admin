// 平台日报表
import request from '@/utils/request'

//上传文件
export function imageSingle(data, fn, code) {
    return request({
        url: '/upload/image/single',
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Function': fn,
            'GamerCode': code
        },
    })
}
