import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://devidol.vercel.app/api/v1',
})
