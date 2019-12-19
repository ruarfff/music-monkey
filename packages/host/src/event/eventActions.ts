import Action from 'IAction'

export const EVENTS_FETCH_INITIATED = 'EVENTS_FETCH_INITIATED'
export const EVENTS_FETCHED = 'EVENTS_FETCHED'
export const EVENTS_FETCH_ERROR = 'EVENTS_FETCH_ERROR'

export const getEvents = (): Action => ({
  type: EVENTS_FETCH_INITIATED
})
