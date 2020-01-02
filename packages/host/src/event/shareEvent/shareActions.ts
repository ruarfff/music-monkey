import { Event } from 'mm-shared'
import { Action } from 'mm-shared'

export const SHARE_EMAIL_REQUEST = 'SHARE_EMAIL_REQUEST'
export const SHARE_EMAIL_FAILURE = 'SHARE_EMAIL_FAILURE'
export const SHARE_EMAIL_SUCCESS = 'SHARE_EMAIL_SUCCESS'

export const CLEAR_MESSAGE = 'CLEAR_MESSAGE'

export const clearMessage = (): Action => {
  return {
    type: CLEAR_MESSAGE
  }
}

export const shareByEmails = (
  emails: string[],
  emailText: string,
  event: Event
): Action => {
  return {
    type: SHARE_EMAIL_REQUEST,
    payload: {
      emails,
      emailText,
      event
    }
  }
}

export const shareByEmailsSuccess = (message: string): Action => {
  return {
    type: SHARE_EMAIL_SUCCESS,
    payload: message
  }
}

export const shareByEmailsFailure = (message: string): Action => {
  return {
    type: SHARE_EMAIL_FAILURE,
    payload: message
  }
}
