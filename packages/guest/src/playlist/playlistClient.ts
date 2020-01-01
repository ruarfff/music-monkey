import client from 'mm-client'
import IUser from '../user/IUser'

export const fetchUsersPlaylists = async (user: IUser) => {
  const response = await client.get('/users/' + user.userId + '/playlists?limit=50', {
    withCredentials: true
  })
  return response.data
}

export const fetchMoreUsersPlaylists = async (user: IUser, offset: number) => {
  const res = await client.get(`/users/${user.userId}/playlists?limit=50&offset=${offset}`, {
    withCredentials: true
  })
  return res.data
}
