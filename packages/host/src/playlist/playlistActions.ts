import IAction from '../IAction'
import ITrack from '../track/ITrack'
import IUser from '../user/IUser'
import IPlaylist from './IPlaylist'

export const FETCH_PLAYLISTS = 'FETCH_PLAYLISTS'
export const FETCH_PLAYLISTS_SUCCESS = 'FETCH_PLAYLISTS_SUCCESS'
export const FETCH_PLAYLISTS_ERROR = 'FETCH_PLAYLISTS_ERROR'
export const PLAYLIST_SELECTED = 'PLAYLIST_SELECTED'
export const PLAYLIST_DESELECTED = 'PLAYLIST_DESELECTED'

export const REMOVE_TRACK_REQUEST = 'REMOVE_TRACK_REQUEST'
export const REMOVE_TRACK_SUCCESS = 'REMOVE_TRACK_SUCCESS'
export const REMOVE_TRACK_FAILURE = 'REMOVE_TRACK_FAILURE'

export const ADD_TRACK_REQUEST = 'ADD_TRACK_REQUEST'
export const ADD_TRACK_SUCCESS = 'ADD_TRACK_SUCCESS'
export const ADD_TRACK_FAILURE = 'ADD_TRACK_FAILURE'

export const SEARCH_TRACKS_REQUEST = 'SEARCH_TRACKS_REQUEST'
export const SEARCH_TRACKS_SUCCESS = 'SEARCH_TRACKS_SUCCESS'
export const SEARCH_TRACKS_FAILURE = 'SEARCH_TRACKS_FAILURE'

export const TRACK_FEATURES_REQUEST = 'TRACK_FEATURES_REQUEST'
export const TRACK_FEATURES_SUCCESS = 'TRACK_FEATURES_SUCCESS'
export const TRACK_FEATURES_FAILURE = 'TRACK_FEATURES_FAILURE'

export const LOAD_MORE_PLAYLISTS_REQUEST = 'LOAD_MORE_PLAYLISTS_REQUEST'
export const LOAD_MORE_PLAYLISTS_SUCCESS = 'LOAD_MORE_PLAYLISTS_SUCCESS'
export const LOAD_MORE_PLAYLISTS_FAILURE = 'LOAD_MORE_PLAYLISTS_FAILURE'

export const EDIT_PLAYLIST_REQUEST = 'EDIT_PLAYLIST_REQUEST'
export const EDIT_PLAYLIST_SUCCESS = 'EDIT_PLAYLIST_SUCCESS'
export const EDIT_PLAYLIST_FAILURE = 'EDIT_PLAYLIST_FAILURE'

export const CLEAR_JUST_CREATED_PLAYLISTS = 'CLEAR_JUST_CREATED_PLAYLISTS'

export const editPlaylist = (
  playlistId: string,
  name: string,
  description: string
): IAction => ({
  type: EDIT_PLAYLIST_REQUEST,
  payload: {
    playlistId,
    name,
    description
  }
})

export const editPlaylistSuccess = (): IAction => ({
  type: EDIT_PLAYLIST_SUCCESS
})

export const editPlaylistFailure = (): IAction => ({
  type: EDIT_PLAYLIST_FAILURE
})

export const clearJustCreatedPlaylists = () => ({
  type: CLEAR_JUST_CREATED_PLAYLISTS
})

export const getMoreUsersPlaylists = (
  user: IUser,
  offset: number
): IAction => ({
  type: LOAD_MORE_PLAYLISTS_REQUEST,
  payload: {
    user,
    offset
  }
})

export const getMoreUsersPlaylistsSuccess = (
  playlists: IPlaylist[]
): IAction => ({
  type: LOAD_MORE_PLAYLISTS_SUCCESS,
  payload: playlists
})

export const getTracksFeatures = (trackIds: string[]): IAction => {
  return {
    type: TRACK_FEATURES_REQUEST,
    payload: trackIds
  }
}

export const getTracksFeaturesSuccess = (trackWithFeatures: any[]): IAction => {
  return {
    type: TRACK_FEATURES_SUCCESS,
    payload: trackWithFeatures
  }
}

export const getTracksFeaturesFailure = (error: string): IAction => {
  return {
    type: TRACK_FEATURES_FAILURE,
    payload: error
  }
}

export const addTrack = (playlistId: string, track: ITrack): IAction => ({
  type: ADD_TRACK_REQUEST,
  payload: {
    playlistId,
    track
  }
})

export const addTrackSuccess = (track: ITrack): IAction => ({
  type: ADD_TRACK_SUCCESS,
  payload: track
})

export const addTrackError = (): IAction => ({
  type: ADD_TRACK_FAILURE
})

export const tryRemoveTrack = (
  playlistId: string,
  trackUri: string,
  trackPosition: number
): IAction => ({
  type: REMOVE_TRACK_REQUEST,
  payload: {
    playlistId,
    trackUri,
    trackPosition
  }
})

export const trackRemoved = (playlist: IPlaylist): IAction => ({
  type: REMOVE_TRACK_SUCCESS,
  payload: playlist
})

export const removeTrackError = (): IAction => ({
  type: REMOVE_TRACK_FAILURE
})

export const fetchPlaylists = (user: IUser): IAction => ({
  type: FETCH_PLAYLISTS,
  payload: user
})

export const fetchPlaylistsSuccess = (data: IPlaylist): IAction => ({
  payload: data,
  type: FETCH_PLAYLISTS_SUCCESS
})

export const fetchPlaylistsError = (error: Error): IAction => ({
  payload: error,
  type: FETCH_PLAYLISTS_ERROR
})

export const searchTrack = (text: string): IAction => ({
  type: SEARCH_TRACKS_REQUEST,
  payload: text
})

export const searchTrackSuccess = (res: any): IAction => ({
  type: SEARCH_TRACKS_SUCCESS,
  payload: res
})

export const searchTrackFailure = (error: string): IAction => ({
  type: SEARCH_TRACKS_FAILURE,
  payload: error
})

export const onPlaylistSelected = (playlist: IPlaylist): IAction => ({
  type: PLAYLIST_SELECTED,
  payload: playlist
})
