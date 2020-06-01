import client from 'mm-client'
import { Playlist } from 'mm-shared'
import UserPlaylistRequest from './UserPlaylistRequest'
import PageObject from './PageObject'

export const fetchUsersPlaylists = async (
  request: UserPlaylistRequest
): Promise<PageObject<Playlist>> => {
  const response = await client.get(
    `/users/${request.user.userId}/playlists?limit=${request.limit}&offset=${request.offset}`,
    {
      withCredentials: true
    }
  )
  return response.data
}
