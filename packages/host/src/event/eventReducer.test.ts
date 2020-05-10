import {
  Action,
  Event,
  Playlist,
  PlaylistItem,
  PlaylistTracks
} from 'mm-shared'
import {
  moveItemInEventPlaylist,
  EVENTS_FETCH_ERROR,
  EVENTS_FETCH_INITIATED,
  EVENTS_FETCHED,
  EVENT_FETCHED_BY_ID,
  EVENT_FETCH_BY_ID_ERROR,
  EVENT_SELECTED
} from './eventActions'
import initialState from './eventInitialState'
import event from './eventReducer'

describe('eventReducer', () => {
  it('should return the initial state when no action matches', () => {
    expect(event(undefined, {} as Action)).toEqual(initialState)
  })

  describe('fetching events', () => {
    it('should handle EVENTS_FETCH_INITIATED', () => {
      expect(
        event(initialState, {
          type: EVENTS_FETCH_INITIATED
        })
      ).toEqual({
        ...initialState,
        eventsLoading: true
      })
    })

    it('should handle EVENTS_FETCHED', () => {
      expect(
        event(
          { ...initialState, eventsLoading: true },
          {
            type: EVENTS_FETCHED,
            payload: [{} as Event]
          }
        )
      ).toEqual({
        ...initialState,
        eventsLoading: false,
        events: [{} as Event]
      })
    })

    it('should handle EVENTS_FETCH_ERROR', () => {
      expect(
        event(initialState, {
          type: EVENTS_FETCH_ERROR,
          payload: new Error('events err')
        })
      ).toEqual({
        ...initialState,
        errors: {
          ...initialState.errors,
          fetchEvents: new Error('events err')
        }
      })
    })
  })

  it('should handle EVENT_SELECTED', () => {
    const newEvent = { ...initialState.event, eventId: 'new-event' }
    expect(
      event(initialState, {
        type: EVENT_SELECTED,
        payload: newEvent
      })
    ).toEqual({ ...initialState, event: newEvent })
  })

  it('should handle EVENT_FETCHED_BY_ID', () => {
    expect(
      event(
        { ...initialState },
        {
          type: EVENT_FETCHED_BY_ID,
          payload: {} as Event
        }
      )
    ).toEqual({
      ...initialState,
      event: {} as Event
    })
  })

  it('should handle EVENT_FETCH_BY_ID_ERROR', () => {
    expect(
      event(initialState, {
        type: EVENT_FETCH_BY_ID_ERROR,
        payload: new Error('event err')
      })
    ).toEqual({
      ...initialState,
      fetchError: new Error('event err')
    })
  })

  it('should return the initial state when no action matches', () => {
    expect(event(undefined, {} as Action)).toEqual(initialState)
  })

  it('should handle MOVE_ITEM_IN_EVENT_PLAYLIST', () => {
    const item1 = { track: { uri: 'item:1' } } as PlaylistItem
    const item2 = { track: { uri: 'item:2' } } as PlaylistItem
    const item3 = { track: { uri: 'item:3' } } as PlaylistItem

    const tracks = { items: [item1, item2, item3] } as PlaylistTracks
    const originalPlaylist = { id: 'playlist-id', tracks } as Playlist
    const reOrderedTracks = { items: [item2, item1, item3] } as PlaylistTracks
    const reOrderedPlaylist = {
      id: 'playlist-id',
      tracks: reOrderedTracks
    } as Playlist
    expect(
      event(
        {
          ...initialState,
          event: { ...initialState.event, playlist: originalPlaylist }
        },
        moveItemInEventPlaylist(originalPlaylist, 0, 1)
      )
    ).toEqual({
      ...initialState,
      event: { ...initialState.event, playlist: reOrderedPlaylist }
    })
  })
})
