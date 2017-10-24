/**
 * Created by hackywit on 2017/9/8.
 */
import axios from '@/utils/http'

export function getDefaultStrategy() {
  return axios({
    url: '/v1/getStrategy',
    method: 'get'
  })
}

export function changeStrategy(data) {
  return axios({
    url: '/v1/change_strategy',
    method: 'post',
    data
  })
}
