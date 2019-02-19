import Action from '../IAction'
import IPlaylistDetails from '../playlist/IPlaylistDetails'
import IUser from '../user/IUser'
import IEvent from './IEvent'

export const EVENT_LOCATION_CHANGED = 'EVENT_LOCATION_CHANGED'
export const EVENT_LOCATION_SELECTED = 'EVENT_LOCATION_SELECTED'
export const EVENT_LOCATION_POPULATED = 'EVENT_LOCATION_POPULATED'
export const EVENT_LOCATION_ERROR = 'EVENT_LOCATION_ERROR'
export const EVENT_CONTENT_UPDATED = 'EVENT_CONTENT_UPDATED'
export const EVENT_IMAGE_UPLOADED = 'EVENT_IMAGE_UPLOADED'
export const EVENT_IMAGE_UPLOAD_ERROR = 'EVENT_IMAGE_UPLOAD_ERROR'
export const EVENT_SAVE_INITIATED = 'EVENT_SAVE_INITIATED'
export const EVENT_SAVED = 'EVENT_SAVED'
export const EVENT_SAVE_ERROR = 'EVENT_SAVE_ERROR'
export const EVENT_SAVING_RESET = 'EVENT_SAVING_RESET'
export const EVENT_CREATE_PLAYLIST_INITIATED = 'EVENT_CREATE_PLAYLIST_INITIATED'
export const EVENT_PLAYLIST_CREATED = 'EVENT_PLAYLIST_CREATED'
export const EVENT_PLAYLIST_CREATION_ERROR = 'EVENT_PLAYLIST_CREATION_ERROR'
export const EVENT_CREATE_FORM_INITIALIZED = 'EVENT_CREATE_FORM_INITIALIZED'
export const EVENTS_FETCH_INITIATED = 'EVENTS_FETCH_INITIATED'
export const EVENTS_FETCHED = 'EVENTS_FETCHED'
export const EVENTS_FETCH_ERROR = 'EVENTS_FETCH_ERROR'

export const SELECT_EXISTING_PLAYLIST_SELECTED =
  'SELECT_EXISTING_PLAYLIST_SELECTED'
export const SELECT_EXISTING_PLAYLIST_CLOSED = 'SELECT_EXISTING_PLAYLIST_CLOSED'

export const CREATE_PLAYLIST_SELECTED = 'CREATE_PLAYLIST_SELECTED'
export const CREATE_PLAYLIST_CLOSED = 'CREATE_PLAYLIST_CLOSED'

export const EVENT_EDIT_REQUEST = 'EVENT_EDIT_REQUEST'
export const EVENT_EDIT_SUCCESS = 'EVENT_EDIT_SUCCESS'
export const EVENT_EDIT_FAILURE = 'EVENT_EDIT_FAILURE'

export const SET_CREATE_EVENT_STEP = 'SET_CREATE_EVENT_STEP'

export const setStep = (step: number):Action => ({
  type: SET_CREATE_EVENT_STEP,
  payload: step,
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

export const eventContentUpdated = (event: IEvent): Action => ({
  payload: event,
  type: EVENT_CONTENT_UPDATED
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

export const selectExistingPlaylist = (): Action => ({
  type: SELECT_EXISTING_PLAYLIST_SELECTED
})

export const closeExistingPlaylist = (): Action => ({
  type: SELECT_EXISTING_PLAYLIST_CLOSED
})

export const selectCreatePlaylist = (): Action => ({
  type: CREATE_PLAYLIST_SELECTED
})

export const closeCreatePlaylist = (): Action => ({
  type: CREATE_PLAYLIST_CLOSED
})

export const createEventPlaylist = (
  playlistDetails: IPlaylistDetails
): Action => ({
  payload: playlistDetails,
  type: EVENT_CREATE_PLAYLIST_INITIATED
})

export const initializeCreateForm = (event: IEvent, user: IUser): Action => ({
  payload: { event, user },
  type: EVENT_CREATE_FORM_INITIALIZED
})

export const getEvents = (): Action => ({
  type: EVENTS_FETCH_INITIATED
})
