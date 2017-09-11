/**
 * Created by hackywit on 2017/9/8.
 */
import axios from '@/utils/http'

export function getAllStrategies() {
  return axios({
    url: '/v1/getall_strategy',
    method: 'get'
  })
}
