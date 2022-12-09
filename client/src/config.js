import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://devidol.mm.vercel.app/api/v1',
})
