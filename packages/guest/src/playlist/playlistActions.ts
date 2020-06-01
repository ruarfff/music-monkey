import { Action, User, Playlist, PageObject } from 'mm-shared'

export const FETCH_PLAYLISTS = 'FETCH_PLAYLISTS'
export const FETCH_PLAYLISTS_SUCCESS = 'FETCH_PLAYLISTS_SUCCESS'
export const FETCH_PLAYLISTS_ERROR = 'FETCH_PLAYLISTS_ERROR'

export const PLAYLIST_CLEAR = 'PLAYLIST_CLEAR'

export const fetchPlaylists = (
  user: User,
  page: PageObject<Playlist>
): Action => ({
  type: FETCH_PLAYLISTS,
  payload: { user, page }
})

export const fetchPlaylistsSuccess = (data: Playlist): Action => ({
  payload: data,
  type: FETCH_PLAYLISTS_SUCCESS
})

export const fetchPlaylistsError = (error: Error): Action => ({
  payload: error,
  type: FETCH_PLAYLISTS_ERROR
})
