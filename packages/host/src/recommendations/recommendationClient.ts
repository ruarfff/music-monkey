import client from 'music-monkey-client'

export const getUserTopTracks = async () => {
  const response = await client.get('/recommendations', {
    withCredentials: true
  })
  return response.data
}
