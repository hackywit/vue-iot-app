/**
 * Created by hackywit on 2017/10/25.
 */
import axios from '@/utils/http'

export function recordHistory(data) {
  return axios({
    url: '/v1/recordHistoryData',
    method: 'post',
    data
  })
}
