import IEvent from '../event/IEvent'
import IAction from '../IAction'
import {
  EVENT_DELETE_CLOSED,
  EVENT_DELETE_FAILED,
  EVENT_DELETE_SELECTED,
  EVENT_DELETE_SUCCESSFUL,
  EVENT_FETCH_BY_ID_ERROR,
  EVENT_FETCH_BY_ID_INITIATED,
  EVENT_FETCHED_BY_ID,
  TOGGLE_AUTO_ACCEPT_SUGGESTIONS,
  TOGGLE_AUTO_ACCEPT_SUGGESTIONS_ERROR,
  TOGGLE_DYNAMIC_VOTING,
  TOGGLE_DYNAMIC_VOTING_ERROR,
  TOGGLE_SUGGESTING_PLAYLISTS,
  TOGGLE_SUGGESTING_PLAYLISTS_ERROR
} from './eventViewActions'
import initialState from './eventViewInitialState'
import eventView from './eventViewReducer'

describe('eventViewReducer', () => {
  it('should return the initial state when no action matches', () => {
    expect(eventView(undefined, {} as IAction)).toEqual(initialState)
  })
  it('should handle EVENT_FETCH_BY_ID_INITIATED', () => {
    expect(
      eventView(initialState, {
        type: EVENT_FETCH_BY_ID_INITIATED
      })
    ).toEqual({
      ...initialState,
      loading: true
    })
  })

  it('should handle EVENT_FETCHED_BY_ID', () => {
    expect(
      eventView(
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
      eventView(initialState, {
        type: EVENT_FETCH_BY_ID_ERROR,
        payload: new Error('event err')
      })
    ).toEqual({
      ...initialState,
      fetchError: new Error('event err')
    })
  })

  it('should handle EVENT_DELETE_SELECTED', () => {
    expect(
      eventView(initialState, {
        type: EVENT_DELETE_SELECTED
      })
    ).toEqual({
      ...initialState,
      deleteSelected: true
    })
  })

  it('should handle EVENT_DELETE_CLOSED', () => {
    expect(
      eventView(
        {
          ...initialState,
          deleteSelected: true,
          deleteFailed: true,
          deleteSucceeded: true
        },
        {
          type: EVENT_DELETE_CLOSED
        }
      )
    ).toEqual({
      ...initialState,
      deleteSelected: false,
      deleteFailed: false,
      deleteSucceeded: false
    })
  })

  it('should handle EVENT_DELETE_SUCCESSFUL', () => {
    expect(
      eventView(
        { ...initialState, deleteSucceeded: false },
        {
          type: EVENT_DELETE_SUCCESSFUL
        }
      )
    ).toEqual({ ...initialState, deleteSucceeded: true })
  })

  it('should handle EVENT_DELETE_FAILED', () => {
    expect(
      eventView(
        { ...initialState, deleteFailed: false },
        {
          type: EVENT_DELETE_FAILED
        }
      )
    ).toEqual({ ...initialState, deleteFailed: true })
  })

  it('should handle TOGGLE_DYNAMIC_VOTING', () => {
    const event = { settings: { dynamicVotingEnabled: false } } as IEvent
    expect(
      eventView({ ...initialState, event }, { type: TOGGLE_DYNAMIC_VOTING })
    ).toEqual({
      ...initialState,
      event: {
        ...event,
        settings: { ...event.settings, dynamicVotingEnabled: true }
      }
    })
  })

  it('should handle TOGGLE_DYNAMIC_VOTING_ERROR', () => {
    const event = { settings: { dynamicVotingEnabled: true } } as IEvent
    expect(
      eventView(
        { ...initialState, event },
        { type: TOGGLE_DYNAMIC_VOTING_ERROR }
      )
    ).toEqual({
      ...initialState,
      event: {
        ...event,
        settings: { ...event.settings, dynamicVotingEnabled: false }
      }
    })
  })

  it('should handle TOGGLE_AUTO_ACCEPT_SUGGESTIONS', () => {
    const event = {
      settings: {
        dynamicVotingEnabled: false,
        autoAcceptSuggestionsEnabled: false
      }
    } as IEvent
    expect(
      eventView(
        { ...initialState, event },
        { type: TOGGLE_AUTO_ACCEPT_SUGGESTIONS }
      )
    ).toEqual({
      ...initialState,
      event: {
        ...event,
        settings: { ...event.settings, autoAcceptSuggestionsEnabled: true }
      }
    })
  })

  it('should handle TOGGLE_AUTO_ACCEPT_SUGGESTIONS_ERROR', () => {
    const event = {
      settings: {
        dynamicVotingEnabled: false,
        autoAcceptSuggestionsEnabled: true
      }
    } as IEvent
    expect(
      eventView(
        { ...initialState, event },
        { type: TOGGLE_AUTO_ACCEPT_SUGGESTIONS_ERROR }
      )
    ).toEqual({
      ...initialState,
      event: {
        ...event,
        settings: { ...event.settings, autoAcceptSuggestionsEnabled: false }
      }
    })
  })

  it('should handle TOGGLE_SUGGESTING_PLAYLISTS', () => {
    const event = {
      settings: {
        suggestingPlaylistsEnabled: false
      }
    } as IEvent
    expect(
      eventView(
        { ...initialState, event },
        { type: TOGGLE_SUGGESTING_PLAYLISTS }
      )
    ).toEqual({
      ...initialState,
      event: {
        ...event,
        settings: { ...event.settings, suggestingPlaylistsEnabled: true }
      }
    })
  })

  it('should handle TOGGLE_SUGGESTING_PLAYLISTS_ERROR', () => {
    const event = {
      settings: {
        suggestingPlaylistsEnabled: true
      }
    } as IEvent
    expect(
      eventView(
        { ...initialState, event },
        { type: TOGGLE_SUGGESTING_PLAYLISTS_ERROR }
      )
    ).toEqual({
      ...initialState,
      event: {
        ...event,
        settings: { ...event.settings, suggestingPlaylistsEnabled: false }
      }
    })
  })
})
