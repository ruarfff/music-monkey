import Action from 'IAction'
import {
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
  EVENT_FETCH_BY_ID_ERROR
} from './eventActions'
import initialState from './eventInitialState'
import event from './eventReducer'
import IEvent from './IEvent'

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
            payload: [{} as IEvent]
          }
        )
      ).toEqual({
        ...initialState,
        eventsLoading: false,
        events: [{} as IEvent]
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

  it('should return the initial state when no action matches', () => {
    expect(event(undefined, {} as Action)).toEqual(initialState)
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
          payload: {} as IEvent
        }
      )
    ).toEqual({
      ...initialState,
      loading: false,
      event: {} as IEvent
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
    const updatedEvent = { settings: { dynamicVotingEnabled: false } } as IEvent
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
    const updatedEvent = { settings: { dynamicVotingEnabled: true } } as IEvent
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
    } as IEvent
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
    } as IEvent
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
    } as IEvent
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
    } as IEvent
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
})
