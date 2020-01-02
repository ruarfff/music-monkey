import client from 'mm-client'
import { User } from 'mm-shared'

export const fetchUsersPlaylists = async (user: User) => {
  const response = await client.get(
    '/users/' + user.userId + '/playlists?limit=50',
    {
      withCredentials: true
    }
  )
  return response.data
}

export const fetchMoreUsersPlaylists = async (user: User, offset: number) => {
  const res = await client.get(
    `/users/${user.userId}/playlists?limit=50&offset=${offset}`,
    {
      withCredentials: true
    }
  )
  return res.data
}
