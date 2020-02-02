import client from 'mm-client'

export const getUserTopTracks = async () => {
  const response = await client.get('/recommendations', {
    withCredentials: true
  })
  return response.data
}
