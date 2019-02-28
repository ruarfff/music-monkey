import Action from '../IAction'
import {
  EVENT_CONTENT_UPDATED,
  EVENT_CREATE_FORM_INITIALIZED,
  EVENT_IMAGE_UPLOAD_ERROR,
  EVENT_IMAGE_UPLOADED,
  EVENT_LOCATION_CHANGED,
  EVENT_LOCATION_ERROR,
  EVENT_LOCATION_POPULATED,
  EVENT_PLAYLIST_CREATION_ERROR,
  EVENT_SAVE_ERROR,
  EVENT_SAVED,
  EVENT_SAVING_RESET,
  EVENTS_FETCH_ERROR,
  EVENTS_FETCH_INITIATED,
  EVENTS_FETCHED,
} from './eventActions'
import initialState from './eventInitialState'
import events from './eventReducer'
import IEvent from './IEvent'

describe('eventReducer', () => {
  it('should return the initial state when no action matches', () => {
    expect(events(undefined, {} as Action)).toEqual(initialState)
  })

  describe('event creation', () => {
    it('should handle EVENT_LOCATION_CHANGED', () => {
      expect(
        events(initialState, {
          type: EVENT_LOCATION_CHANGED,
          payload: 'test'
        })
      ).toEqual({
        ...initialState,
        savingEvent: {
          ...initialState.savingEvent,
          location: { address: 'test', latLng: { lat: 0, lng: 0 } }
        }
      })
    })

    it('should reset errors when EVENT_LOCATION_CHANGED', () => {
      expect(
        events(
          { ...initialState, errors: { location: new Error('wut') } },
          {
            type: EVENT_LOCATION_CHANGED,
            payload: 'test'
          }
        )
      ).toEqual({
        ...initialState,
        savingEvent: {
          ...initialState.savingEvent,
          location: { address: 'test', latLng: { lat: 0, lng: 0 } }
        },
        errors: { location: undefined }
      })
    })

    it('should handle EVENT_LOCATION_POPULATED', () => {
      expect(
        events(initialState, {
          type: EVENT_LOCATION_POPULATED,
          payload: {
            address: 'test-address',
            latLng: { lat: '123', lng: '456' }
          }
        })
      ).toEqual({
        ...initialState,
        savingEvent: {
          ...initialState.savingEvent,
          location: {
            address: 'test-address',
            latLng: { lat: '123', lng: '456' }
          }
        }
      })
    })

    it('should handle EVENT_LOCATION_ERROR', () => {
      expect(
        events(initialState, {
          type: EVENT_LOCATION_ERROR,
          payload: new Error('so bad')
        })
      ).toEqual({
        ...initialState,
        errors: { ...initialState.errors, location: new Error('so bad') }
      })
    })

    it('should hande EVENT_IMAGE_UPLOADED', () => {
      expect(
        events(initialState, {
          type: EVENT_IMAGE_UPLOADED,
          payload: {
            imgUrl: 'image_url',
            dataUrl: 'data_url'
          }
        })
      ).toEqual({
        ...initialState,
        savingEvent: { ...initialState.savingEvent, imageUrl: 'image_url', dataUrl: 'data_url' }
      })
    })

    it('should handle EVENT_IMAGE_UPLOAD_ERROR', () => {
      expect(
        events(initialState, {
          type: EVENT_IMAGE_UPLOAD_ERROR,
          payload: new Error('how could this happen?')
        })
      ).toEqual({
        ...initialState,
        errors: {
          ...initialState.errors,
          imageUpload: new Error('how could this happen?')
        }
      })
    })

    it('should handle EVENT_CONTENT_UPDATED and add a new value', () => {
      expect(
        events(initialState, {
          type: EVENT_CONTENT_UPDATED,
          payload: { name: 'test-name' }
        })
      ).toEqual({
        ...initialState,
        savingEvent: { ...initialState.savingEvent, name: 'test-name' }
      })
    })

    it('should handle EVENT_CONTENT_UPDATED and update an existing value', () => {
      expect(
        events(
          {
            ...initialState,
            savingEvent: {
              ...initialState.savingEvent,
              organizer: 'this-person'
            }
          },
          {
            type: EVENT_CONTENT_UPDATED,
            payload: { organizer: 'other' }
          }
        )
      ).toEqual({
        ...initialState,
        savingEvent: { ...initialState.savingEvent, organizer: 'other' }
      })
    })

    it('should handle EVENT_SAVING_RESET', () => {
      expect(
        events(
          {
            ...initialState,
            savingEvent: { ...initialState.savingEvent, name: 'whataname' },
            showSavedDialogue: true
          },
          {
            type: EVENT_SAVING_RESET
          }
        )
      ).toEqual({ ...initialState })
    })

    it('should handle EVENT_SAVED', () => {
      const savingEvent = initialState.savingEvent
      const event = { ...savingEvent, name: 'save-me' }
      expect(
        events(initialState, {
          type: EVENT_SAVED,
          payload: event
        })
      ).toEqual({
        ...initialState,
        events: [...initialState.events, event],
        savingEvent: event,
        showSavedDialogue: true
      })
    })

    it('should handle EVENT_SAVE_ERROR', () => {
      expect(
        events(initialState, {
          payload: new Error('oh the humanity'),
          type: EVENT_SAVE_ERROR
        })
      ).toEqual({
        ...initialState,
        errors: {
          ...initialState.errors,
          saving: new Error('oh the humanity')
        }
      })
    })

    it('should handle EVENT_CREATE_FORM_INITIALIZED', () => {
      expect(
        events(
          { ...initialState },
          {
            payload: {
              event: initialState.savingEvent,
              user: { userId: 'test-id', displayName: 'test user' }
            },
            type: EVENT_CREATE_FORM_INITIALIZED
          }
        )
      ).toEqual({
        ...initialState,
        savingEvent: {
          ...initialState.savingEvent,
          userId: 'test-id',
          organizer: 'test user'
        }
      })
    })

    it('should handle EVENT_PLAYLIST_CREATION_ERROR', () => {
      expect(
        events(initialState, {
          type: EVENT_PLAYLIST_CREATION_ERROR,
          payload: new Error('Error creating playlist')
        })
      ).toEqual({
        ...initialState,
        errors: {
          ...initialState.errors,
          playlistCreation: new Error('Error creating playlist')
        }
      })
    })
  })

  describe('fetching events', () => {
    it('should handle EVENTS_FETCH_INITIATED', () => {
      expect(
        events(initialState, {
          type: EVENTS_FETCH_INITIATED
        })
      ).toEqual({
        ...initialState,
        eventsLoading: true
      })
    })

    it('should handle EVENTS_FETCHED', () => {
      expect(
        events(
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
        events(initialState, {
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
})
