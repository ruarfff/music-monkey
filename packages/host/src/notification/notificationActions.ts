import { Action } from 'mm-shared'
import { INotification } from './notificationInitialState'

export const NOTIFICATION_FETCH_REQUEST = 'NOTIFICATION_FETCH_REQUEST'
export const NOTIFICATION_FETCH_SUCCESS = 'NOTIFICATION_FETCH_SUCCESS'
export const NOTIFICATION_FETCH_FAILURE = 'NOTIFICATION_FETCH_FAILURE'

export const NOTIFICATION_UPDATE_REQUEST = 'NOTIFICATION_UPDATE_REQUEST'
export const NOTIFICATION_UPDATE_SUCCESS = 'NOTIFICATION_UPDATE_SUCCESS'
export const NOTIFICATION_UPDATE_FAILURE = 'NOTIFICATION_UPDATE_FAILURE'

export const READ_NOTIFICATION = 'READ_NOTIFICATION'
export const ACTIONED_NOTIFICATION = 'ACTIONED_NOTIFICATION'

export const updateNotification = (notification: INotification): Action => {
  return {
    type: NOTIFICATION_UPDATE_REQUEST,
    payload: notification,
  }
}

export const updateNotificationSuccess = (): Action => {
  return {
    type: NOTIFICATION_UPDATE_SUCCESS,
  }
}

export const updateNotificationFailure = (error: string): Action => {
  return {
    type: NOTIFICATION_UPDATE_FAILURE,
    payload: error
  }
}

export const getNotifications = (userId: string): Action => {
  return {
    type: NOTIFICATION_FETCH_REQUEST,
    payload: userId,
  }
}

export const getNotificationsSuccess = (notifications: INotification[]): Action => {
  return {
    type: NOTIFICATION_FETCH_SUCCESS,
    payload: notifications,
  }
}

export const getNotificationsFailure = (error: string): Action => {
  return {
    type: NOTIFICATION_FETCH_FAILURE,
    payload: error,
  }
}

export const readNotification = (notificationId: string): Action => {
  return {
    type: READ_NOTIFICATION,
    payload: notificationId
  }
}

export const actionedNotification = (notificationId: string): Action => {
  return {
    type: ACTIONED_NOTIFICATION,
    payload: notificationId
  }
}