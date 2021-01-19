import request from '@/utils/request'

export function test(callback: Function) {
  return request({
    url: '/comment/hotwall/list',
    method: 'GET',
  }, callback)

}
