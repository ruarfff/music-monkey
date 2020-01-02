import { Action, Event, User, Playlist } from 'mm-shared'

export const FETCH_PLAYLISTS = 'FETCH_PLAYLISTS'
export const FETCH_PLAYLISTS_SUCCESS = 'FETCH_PLAYLISTS_SUCCESS'
export const FETCH_PLAYLISTS_ERROR = 'FETCH_PLAYLISTS_ERROR'

export const FETCH_MORE_PLAYLISTS_REQUEST = 'FETCH_MORE_PLAYLISTS_REQUEST'
export const FETCH_MORE_PLAYLISTS_SUCCESS = 'FETCH_MORE_PLAYLISTS_SUCCESS'
export const FETCH_MORE_PLAYLISTS_FAILURE = 'FETCH_MORE_PLAYLISTS_FAILURE'

export const PLAYLIST_CLEAR = 'PLAYLIST_CLEAR'
export const EVENT_PLAYLISTS_LOADED = 'EVENT_PLAYLISTS_LOADED'

export const fetchMorePlaylists = (user: User) => ({
  type: FETCH_MORE_PLAYLISTS_REQUEST,
  payload: user
})

export const fetchMorePlaylistsSuccess = (data: Playlist[]) => ({
  type: FETCH_MORE_PLAYLISTS_SUCCESS,
  payload: data
})

export const fetchMorePlaylistsError = (error: Error) => ({
  type: FETCH_MORE_PLAYLISTS_SUCCESS,
  payload: error
})

export const fetchPlaylists = (user: User): Action => ({
  type: FETCH_PLAYLISTS,
  payload: user
})

export const fetchPlaylistsSuccess = (data: Playlist): Action => ({
  payload: data,
  type: FETCH_PLAYLISTS_SUCCESS
})

export const fetchPlaylistsError = (error: Error): Action => ({
  payload: error,
  type: FETCH_PLAYLISTS_ERROR
})

export const loadEventPlaylists = (events: Event[]): Action => ({
  type: EVENT_PLAYLISTS_LOADED,
  payload: events
})
