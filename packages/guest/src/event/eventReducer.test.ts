import Action from '../IAction'
import {
  EVENT_FETCH_ERROR,
  EVENT_FETCH_INITIATED,
  EVENT_FETCHED,
  EVENT_SELECTED,
  EVENT_SUGGESTION_DESELECTED,
  EVENT_SUGGESTION_SELECTED,
  FETCH_USERS_EVENTS_SUCCESS,
  EVENT_ID_SET
} from './eventActions'
import initialState from './eventInitialState'
import event from './eventReducer'
import IEvent from './IEvent'
import ISelectedSuggestion from './ISelectedSuggestion'

describe('eventReducer', () => {
  it('should return the initial state when no action matches', () => {
    expect(event(undefined, {} as Action)).toEqual(initialState)
  })

  describe('fetching event', () => {
    it('should handle EVENT_FETCH_INITIATED', () => {
      expect(
        event(initialState, {
          type: EVENT_FETCH_INITIATED
        })
      ).toEqual({
        ...initialState,
        eventLoading: true
      })
    })

    it('should handle EVENT_FETCHED', () => {
      expect(
        event(
          { ...initialState, eventLoading: true },
          {
            type: EVENT_FETCHED,
            payload: {eventId: 'event-id'} as IEvent
          }
        )
      ).toEqual({
        ...initialState,
        eventLoading: false,
        selectedEvent: {eventId: 'event-id'} as IEvent,
        eventId: 'event-id'
      })
    })

    it('should handle EVENT_FETCH_ERROR', () => {
      expect(
        event(initialState, {
          type: EVENT_FETCH_ERROR,
          payload: new Error('event err')
        })
      ).toEqual({
        ...initialState,
        fetchEventError: new Error('event err')
      })
    })
  })

  it('should handle EVENT_SUGGESTION_SELECTED', () => {
    expect(
      event(initialState, {
        type: EVENT_SUGGESTION_SELECTED,
        payload: {} as ISelectedSuggestion
      })
    ).toEqual({
      ...initialState,
      selectedSuggestion: {} as ISelectedSuggestion
    })
  })

  it('should handle EVENT_SUGGESTION_DESELECTED', () => {
    expect(
      event(
        { ...initialState, selectedSuggestion: {} as ISelectedSuggestion },
        { type: EVENT_SUGGESTION_DESELECTED }
      )
    ).toEqual(initialState)
  })

  it('should handle FETCH_USERS_EVENTS_SUCCESS', () => {
    const events = [] as IEvent[]
    expect(
      event(initialState, { type: FETCH_USERS_EVENTS_SUCCESS, payload: events })
    ).toEqual({ ...initialState, events })
  })

  it('should handle EVENT_SELECTED', () => {
    expect(
      event(initialState, {
        type: EVENT_SELECTED,
        payload: { eventId: 'event-id' }
      })
    ).toEqual({
      ...initialState,
      selectedEvent: { eventId: 'event-id' },
      eventId: 'event-id'
    })
  })

  it('should handle EVENT_ID_SET', () => {
    expect(
      event(initialState, { type: EVENT_ID_SET, payload: '1234' })
    ).toEqual({ ...initialState, eventId: '1234' })
  })
})
