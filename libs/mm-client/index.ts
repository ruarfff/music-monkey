import axios from 'axios'
import axiosRetry, { exponentialDelay } from 'axios-retry'

const serviceUrl = process.env.REACT_APP_MM_API_URL

const client = axios.create({
  baseURL: serviceUrl,
  headers: { 'Cache-Control': 'no-cache' }
})

axiosRetry(client, { retryDelay: exponentialDelay })

export default client
