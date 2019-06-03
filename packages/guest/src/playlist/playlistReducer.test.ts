import Action from '../IAction'
import {
  EVENT_PLAYLISTS_LOADED,
  FETCH_PLAYLISTS,
  FETCH_PLAYLISTS_ERROR,
  FETCH_PLAYLISTS_SUCCESS
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

it('should handle EVENT_PLAYLISTS_LOADED', () => {
  const events = [
    { eventId: 'event-1', playlistUrl: '1', playlist: { id: 'playlist-1' } },
    { eventId: 'event-2', playlistUrl: '2', playlist: { id: 'playlist-2' } }
  ]
  expect(
    playlist(initialState, { payload: events, type: EVENT_PLAYLISTS_LOADED })
  ).toEqual({
    ...initialState,
    eventPlaylists: [
      { id: 'playlist-1', eventId: 'event-1' },
      { id: 'playlist-2', eventId: 'event-2' }
    ]
  })
})
