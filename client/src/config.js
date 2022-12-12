import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://devidol-mm.cyclic.app/api/v1',
})
