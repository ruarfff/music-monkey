import http from '../http'
import IUser from '../user/IUser'

export const fetchUsersPlaylists = async (user: IUser) => {
  const response = await http.get('/users/' + user.userId + '/playlists', {
    withCredentials: true
  })
  return response.data
}
