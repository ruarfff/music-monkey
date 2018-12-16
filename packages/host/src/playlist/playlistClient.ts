import client from 'music-monkey-client'
import IUser from '../user/IUser'
import IPlaylist from './IPlaylist'

export const addTracksToPlaylist = async (
  playlistId: string,
  trackUris: string[]
) => {
  const res = await client.post(
    '/playlists/' + playlistId + '/tracks',
    { trackUris },
    {
      withCredentials: true,
      cache: false
    } as any
  )
  return res.data.body
}

export const reOrderPlaylist = async (
  playlist: IPlaylist,
  fromIndex: number,
  toIndex: number
) => {
  const res = await client.put(
    '/playlists/' + playlist.id + '/tracks',
    {
      fromIndex,
      toIndex
    },
    {
      withCredentials: true,
      cache: false
    } as any
  )
  return res.data.body
}

export const fetchPlaylist = async (playlistId: string) => {
  const res = await client.get('/playlists/' + playlistId, {
    withCredentials: true
  })
  return res.data
}

export const fetchUsersPlaylists = async (user: IUser) => {
  const res = await client.get('/users/' + user.userId + '/playlists', {
    withCredentials: true
  })
  return res.data
}

export const createPlaylist = async (name: string, description = '') => {
  const res = await client.post('/playlists', { name, description }, {
    withCredentials: true,
    cache: false
  } as any)
  return res.data.body
}

export const replaceTracksInPlaylist = async (
  playlistId: string,
  trackUris: string[]
) => {
  const res = await client.put(
    '/playlists/' + playlistId + '/tracks',
    { trackUris },
    {
      withCredentials: true,
      cache: false
    } as any
  )
  return res.data.body
}

export const removeTrackFromPlaylist = async (
  playlistId: string,
  uri: string,
  position: number
) => {
  const res = await client.delete('/playlists/' + playlistId + '/tracks', {
    data: { tracks: [{ uri }, position] },
    withCredentials: true,
    cache: false
  } as any)
  return res.data
}

export const searchForTracks = async (searchTerm: string) => {
  const response = await client.get(
    '/search?q=' + encodeURIComponent(searchTerm) + '&type=track',
    {
      withCredentials: true
    }
  )
  return response.data
}

export const getTracksFeatures = async (trackIds: string[]) => {
  const response = await client.get(
    `/tracks/audio-features?trackUris=${trackIds.join(',')}`,
    {
      withCredentials: true
    }
  )
  return response.data
}
