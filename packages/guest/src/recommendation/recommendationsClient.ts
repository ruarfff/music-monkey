import http from '../http'

export const getUserTopTracks = async () => {
  const response = await http.get('/recommendations', {
    withCredentials: true
  })
  return response.data
}
