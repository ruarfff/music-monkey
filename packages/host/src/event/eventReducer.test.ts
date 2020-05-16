import { Action, Event } from 'mm-shared'
import {
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
})
