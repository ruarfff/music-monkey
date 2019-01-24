import Action from '../IAction'
import IPlaylist from './IPlaylist'
import {
  ADD_TRACK_FAILURE,
  ADD_TRACK_SUCCESS,
  FETCH_PLAYLISTS,
  FETCH_PLAYLISTS_ERROR,
  FETCH_PLAYLISTS_SUCCESS,
  PLAYLIST_DESELECTED,
  PLAYLIST_SELECTED,
  REMOVE_TRACK_FAILURE,
  REMOVE_TRACK_SUCCESS,
} from './playlistActions'
import initialState from './playlistInitialState'
import playlist from './playlistReducer'

it('should return the initial state when no action matches', () => {
  expect(playlist(undefined, {} as Action)).toEqual(initialState)
})

it('should handle FETCH_PLAYLIST', () => {
  expect(playlist(initialState, { type: FETCH_PLAYLISTS })).toEqual({
    ...initialState,
    isLoading: true
  })
})

it('should handle ADD_TRACK_FAILURE', () => {
  expect(playlist(initialState, {type: ADD_TRACK_FAILURE})).toEqual({
    ...initialState,
    notification: 'Error. Retry add track later',
  })
})

it('should handle ADD_TRACK_SUCCESS', () => {
  expect(playlist(initialState, {type: ADD_TRACK_SUCCESS})).toEqual({
    ...initialState,
    notification: '',
  })
})


it('should handle REMOVE_TRACK_FAILURE', () => {
  expect(playlist(initialState, {type: REMOVE_TRACK_FAILURE})).toEqual({
    ...initialState,
    notification: 'Error. Retry remove track later',
  })
})

it('should handle REMOVE_TRACK_SUCCESS', () => {
  expect(playlist(initialState, {type: REMOVE_TRACK_SUCCESS})).toEqual({
    ...initialState,
    notification: 'Track successfully removed'
  })
})

it('should handle FETCH_PLAYLIST_SUCCESS', () => {
  expect(
    playlist(
      { ...initialState, isLoading: true },
      {
        payload: {
          id: 'test-id'
        },
        type: FETCH_PLAYLISTS_SUCCESS
      }
    )
  ).toEqual({
    ...initialState,
    data: { id: 'test-id' },
    isLoading: false
  })
})

it('should handle FETCH_PLAYLIST_ERROR', () => {
  expect(
    playlist(initialState, {
      payload: new Error('Oh dear :('),
      type: FETCH_PLAYLISTS_ERROR
    })
  ).toEqual({ ...initialState, error: new Error('Oh dear :(') })
})

it('should handle PLAYLIST_SELECTED', () => {
  expect(
    playlist(initialState, {
      payload: {} as IPlaylist,
      type: PLAYLIST_SELECTED
    })
  ).toEqual({ ...initialState, selectedPlaylist: {} as IPlaylist })
})

it('should handle PLAYLIST_DESELECTED', () => {
  expect(
    playlist(
      { ...initialState, selectedPlaylist: {} as IPlaylist },
      {
        type: PLAYLIST_DESELECTED
      }
    )
  ).toEqual(initialState)
})
