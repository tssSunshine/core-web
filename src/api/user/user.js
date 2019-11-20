import request from '@/utils/request'

export function API_findAllUser() {
  return request({
    url: '/user/findAllUser',
    method: 'get',
    params: {

    }
  })
}
