import {
  Action,
  Event,
  Playlist,
  PlaylistItem,
  PlaylistTracks
} from 'mm-shared'
import {
  moveItemInEventPlaylist,
  SAVE_EVENT_PLAYLIST,
  SAVE_EVENT_PLAYLIST_ERROR,
  SAVE_EVENT_PLAYLIST_SUCCESS,
  EVENTS_FETCH_ERROR,
  EVENTS_FETCH_INITIATED,
  EVENTS_FETCHED,
  EVENT_FETCH_BY_ID_INITIATED,
  EVENT_FETCHED_BY_ID,
  EVENT_INVITE_COPIED,
  EVENT_INVITE_COPY_ACKNOWLEDGED,
  TOGGLE_AUTO_ACCEPT_SUGGESTIONS,
  TOGGLE_AUTO_ACCEPT_SUGGESTIONS_ERROR,
  TOGGLE_DYNAMIC_VOTING,
  TOGGLE_DYNAMIC_VOTING_ERROR,
  TOGGLE_SUGGESTING_PLAYLISTS,
  TOGGLE_SUGGESTING_PLAYLISTS_ERROR,
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

  it('should handle EVENT_INVITE_COPIED', () => {
    expect(event(initialState, { type: EVENT_INVITE_COPIED })).toEqual({
      ...initialState,
      copiedToClipboard: true
    })
  })

  it('should handle EVENT_INVITE_COPY_ACKNOWLEDGED', () => {
    expect(
      event(initialState, { type: EVENT_INVITE_COPY_ACKNOWLEDGED })
    ).toEqual({
      ...initialState,
      copiedToClipboard: false
    })
  })

  it('should handle EVENT_FETCH_BY_ID_INITIATED', () => {
    expect(
      event(initialState, {
        type: EVENT_FETCH_BY_ID_INITIATED
      })
    ).toEqual({
      ...initialState,
      loading: true
    })
  })

  it('should handle EVENT_FETCHED_BY_ID', () => {
    expect(
      event(
        { ...initialState, loading: true },
        {
          type: EVENT_FETCHED_BY_ID,
          payload: {} as Event
        }
      )
    ).toEqual({
      ...initialState,
      loading: false,
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

  it('should handle TOGGLE_DYNAMIC_VOTING', () => {
    const updatedEvent = { settings: { dynamicVotingEnabled: false } } as Event
    expect(
      event(
        { ...initialState, event: updatedEvent },
        { type: TOGGLE_DYNAMIC_VOTING }
      )
    ).toEqual({
      ...initialState,
      event: {
        ...updatedEvent,
        settings: { ...updatedEvent.settings, dynamicVotingEnabled: true }
      }
    })
  })

  it('should handle TOGGLE_DYNAMIC_VOTING_ERROR', () => {
    const updatedEvent = { settings: { dynamicVotingEnabled: true } } as Event
    expect(
      event(
        { ...initialState, event: updatedEvent },
        { type: TOGGLE_DYNAMIC_VOTING_ERROR }
      )
    ).toEqual({
      ...initialState,
      event: {
        ...updatedEvent,
        settings: { ...updatedEvent.settings, dynamicVotingEnabled: false }
      }
    })
  })

  it('should handle TOGGLE_AUTO_ACCEPT_SUGGESTIONS', () => {
    const updatedEvent = {
      settings: {
        dynamicVotingEnabled: false,
        autoAcceptSuggestionsEnabled: false
      }
    } as Event
    expect(
      event(
        { ...initialState, event: updatedEvent },
        { type: TOGGLE_AUTO_ACCEPT_SUGGESTIONS }
      )
    ).toEqual({
      ...initialState,
      event: {
        ...updatedEvent,
        settings: {
          ...updatedEvent.settings,
          autoAcceptSuggestionsEnabled: true
        }
      }
    })
  })

  it('should handle TOGGLE_AUTO_ACCEPT_SUGGESTIONS_ERROR', () => {
    const updatedEvent = {
      settings: {
        dynamicVotingEnabled: false,
        autoAcceptSuggestionsEnabled: true
      }
    } as Event
    expect(
      event(
        { ...initialState, event: updatedEvent },
        { type: TOGGLE_AUTO_ACCEPT_SUGGESTIONS_ERROR }
      )
    ).toEqual({
      ...initialState,
      event: {
        ...updatedEvent,
        settings: {
          ...updatedEvent.settings,
          autoAcceptSuggestionsEnabled: false
        }
      }
    })
  })

  it('should handle TOGGLE_SUGGESTING_PLAYLISTS', () => {
    const updatedEvent = {
      settings: {
        suggestingPlaylistsEnabled: false
      }
    } as Event
    expect(
      event(
        { ...initialState, event: updatedEvent },
        { type: TOGGLE_SUGGESTING_PLAYLISTS }
      )
    ).toEqual({
      ...initialState,
      event: {
        ...updatedEvent,
        settings: { ...updatedEvent.settings, suggestingPlaylistsEnabled: true }
      }
    })
  })

  it('should handle TOGGLE_SUGGESTING_PLAYLISTS_ERROR', () => {
    const updatedEvent = {
      settings: {
        suggestingPlaylistsEnabled: true
      }
    } as Event
    expect(
      event(
        { ...initialState, event: updatedEvent },
        { type: TOGGLE_SUGGESTING_PLAYLISTS_ERROR }
      )
    ).toEqual({
      ...initialState,
      event: {
        ...updatedEvent,
        settings: {
          ...updatedEvent.settings,
          suggestingPlaylistsEnabled: false
        }
      }
    })
  })

  it('should return the initial state when no action matches', () => {
    expect(event(undefined, {} as Action)).toEqual(initialState)
  })

  it('should handle SAVE_EVENT_PLAYLIST', () => {
    expect(
      event(initialState, {
        type: SAVE_EVENT_PLAYLIST
      })
    ).toEqual({
      ...initialState,
      savingEventPlaylist: true
    })
  })

  it('should handle SAVE_EVENT_PLAYLIST_SUCCESS', () => {
    expect(
      event(
        {
          ...initialState,
          savingEventPlaylist: true
        },
        {
          type: SAVE_EVENT_PLAYLIST_SUCCESS
        }
      )
    ).toEqual({
      ...initialState,
      savingEventPlaylist: false
    })
  })

  it('should handle SAVE_EVENT_PLAYLIST_ERROR', () => {
    expect(
      event(
        {
          ...initialState,
          savingEventPlaylist: true
        },
        {
          type: SAVE_EVENT_PLAYLIST_ERROR,
          payload: new Error('oh-the-humanity')
        }
      )
    ).toEqual({
      ...initialState,
      savingEventPlaylist: false,
      saveEventPlaylistError: new Error('oh-the-humanity')
    })
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
