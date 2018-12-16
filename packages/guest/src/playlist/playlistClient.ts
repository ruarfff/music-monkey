import client from 'music-monkey-client'
import IUser from '../user/IUser'

export const fetchUsersPlaylists = async (user: IUser) => {
  const response = await client.get('/users/' + user.userId + '/playlists', {
    withCredentials: true
  })
  return response.data
}
