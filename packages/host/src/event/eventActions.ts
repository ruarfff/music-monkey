import Action from '../IAction'
import IUser from '../user/IUser'
import IEvent from './IEvent'

export const EVENT_LOCATION_CHANGED = 'EVENT_LOCATION_CHANGED'
export const EVENT_LOCATION_SELECTED = 'EVENT_LOCATION_SELECTED'
export const EVENT_LOCATION_POPULATED = 'EVENT_LOCATION_POPULATED'
export const EVENT_LOCATION_ERROR = 'EVENT_LOCATION_ERROR'
export const EVENT_IMAGE_UPLOADED = 'EVENT_IMAGE_UPLOADED'
export const EVENT_IMAGE_UPLOAD_ERROR = 'EVENT_IMAGE_UPLOAD_ERROR'
export const EVENT_SAVE_INITIATED = 'EVENT_SAVE_INITIATED'
export const EVENT_SAVED = 'EVENT_SAVED'
export const EVENT_SAVE_ERROR = 'EVENT_SAVE_ERROR'
export const EVENT_SAVING_RESET = 'EVENT_SAVING_RESET'
export const EVENT_CREATE_FORM_INITIALIZED = 'EVENT_CREATE_FORM_INITIALIZED'
export const EVENTS_FETCH_INITIATED = 'EVENTS_FETCH_INITIATED'
export const EVENTS_FETCHED = 'EVENTS_FETCHED'
export const EVENTS_FETCH_ERROR = 'EVENTS_FETCH_ERROR'
export const EVENT_EDIT_REQUEST = 'EVENT_EDIT_REQUEST'
export const EVENT_EDIT_SUCCESS = 'EVENT_EDIT_SUCCESS'
export const EVENT_EDIT_FAILURE = 'EVENT_EDIT_FAILURE'
export const CLEAR_SAVING_EVENT = 'CLEAR_SAVING_EVENT'

export const clearSavingEvent = (): Action => ({
  type: CLEAR_SAVING_EVENT
})

export const editEventSuccess = (): Action => ({
  type: EVENT_EDIT_SUCCESS
})

export const editEventFailure = (): Action => ({
  type: EVENT_EDIT_FAILURE
})

export const editEventRequest = (event: IEvent): Action => ({
  payload: event,
  type: EVENT_EDIT_REQUEST
})

export const locationChanged = (address: string): Action => ({
  payload: address,
  type: EVENT_LOCATION_CHANGED
})

export const locationSelected = (address: string): Action => ({
  payload: address,
  type: EVENT_LOCATION_SELECTED
})

export const eventImageUploaded = (img: any): Action => ({
  payload: img,
  type: EVENT_IMAGE_UPLOADED
})

export const eventImageUploadError = (err: Error): Action => ({
  payload: err,
  type: EVENT_IMAGE_UPLOAD_ERROR
})

export const saveEvent = (event: IEvent): Action => ({
  payload: event,
  type: EVENT_SAVE_INITIATED
})

export const eventSavingReset = (): Action => ({
  type: EVENT_SAVING_RESET
})

export const initializeCreateForm = (event: IEvent, user: IUser): Action => ({
  payload: { event, user },
  type: EVENT_CREATE_FORM_INITIALIZED
})

export const getEvents = (): Action => ({
  type: EVENTS_FETCH_INITIATED
})
