import axios from '@/utils/http'

export function getAllData() {
	return axios({
		url: '/v1/alldevice_data',
		method: 'get'
	})
}

export function deviceUpdateData(data) {
  return axios({
    url: '/v1/devices_updata_data',
    method: 'post',
    data
  })
}
