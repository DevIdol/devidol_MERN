import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://devidol.herokuapp.com/api/v1',
})
