import axios from 'axios'
// import { AxiosAdapter } from 'axios'
// import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions'

const serviceUrl = process.env.REACT_APP_MM_API_URL

// const defaultAdapter: AxiosAdapter =
//   axios.defaults.adapter || ({} as AxiosAdapter)

// enhance the original axios adapter with throttle and cache enhancer
const client = axios.create({
  baseURL: serviceUrl,
  headers: { 'Cache-Control': 'no-cache' }
  // adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(defaultAdapter))
})

export default client
