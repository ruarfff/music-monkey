import { User, Action, Playlist } from 'mm-shared'

export const FETCH_PLAYLISTS = 'FETCH_PLAYLISTS'
export const FETCH_PLAYLISTS_SUCCESS = 'FETCH_PLAYLISTS_SUCCESS'
export const FETCH_PLAYLISTS_ERROR = 'FETCH_PLAYLISTS_ERROR'
export const PLAYLIST_SELECTED = 'PLAYLIST_SELECTED'
export const PLAYLIST_DESELECTED = 'PLAYLIST_DESELECTED'

export const SEARCH_TRACKS_REQUEST = 'SEARCH_TRACKS_REQUEST'
export const SEARCH_TRACKS_SUCCESS = 'SEARCH_TRACKS_SUCCESS'
export const SEARCH_TRACKS_FAILURE = 'SEARCH_TRACKS_FAILURE'

export const LOAD_MORE_PLAYLISTS_REQUEST = 'LOAD_MORE_PLAYLISTS_REQUEST'
export const LOAD_MORE_PLAYLISTS_SUCCESS = 'LOAD_MORE_PLAYLISTS_SUCCESS'
export const LOAD_MORE_PLAYLISTS_FAILURE = 'LOAD_MORE_PLAYLISTS_FAILURE'

export const EDIT_PLAYLIST_REQUEST = 'EDIT_PLAYLIST_REQUEST'
export const EDIT_PLAYLIST_SUCCESS = 'EDIT_PLAYLIST_SUCCESS'
export const EDIT_PLAYLIST_FAILURE = 'EDIT_PLAYLIST_FAILURE'

export const editPlaylist = (
  playlistId: string,
  name: string,
  description: string
): Action => ({
  type: EDIT_PLAYLIST_REQUEST,
  payload: {
    playlistId,
    name,
    description
  }
})

export const editPlaylistSuccess = (): Action => ({
  type: EDIT_PLAYLIST_SUCCESS
})

export const editPlaylistFailure = (): Action => ({
  type: EDIT_PLAYLIST_FAILURE
})

export const getMoreUsersPlaylists = (user: User, offset: number): Action => ({
  type: LOAD_MORE_PLAYLISTS_REQUEST,
  payload: {
    user,
    offset
  }
})

export const getMoreUsersPlaylistsSuccess = (
  playlists: Playlist[]
): Action => ({
  type: LOAD_MORE_PLAYLISTS_SUCCESS,
  payload: playlists
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

export const searchTrack = (text: string): Action => ({
  type: SEARCH_TRACKS_REQUEST,
  payload: text
})

export const searchTrackSuccess = (res: any): Action => ({
  type: SEARCH_TRACKS_SUCCESS,
  payload: res
})

export const searchTrackFailure = (error: string): Action => ({
  type: SEARCH_TRACKS_FAILURE,
  payload: error
})

export const onPlaylistSelected = (playlist: Playlist): Action => ({
  type: PLAYLIST_SELECTED,
  payload: playlist
})
