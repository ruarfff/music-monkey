import * as _ from 'lodash'
import moment from 'moment'
import Action from '../IAction'
import {
  ACTIONED_NOTIFICATION,
  NOTIFICATION_FETCH_FAILURE,
  NOTIFICATION_FETCH_REQUEST,
  NOTIFICATION_FETCH_SUCCESS,
  READ_NOTIFICATION
} from './notificationActions'
import initialState, {
  INotification,
  INotificationState
} from './notificationInitialState'

export default function notification(
  state: INotificationState = initialState,
  { type, payload }: Action
) {
  switch (type) {
    case NOTIFICATION_FETCH_REQUEST:
      return {
        ...state,
        loading: true
      }

    case NOTIFICATION_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload
      }

    case NOTIFICATION_FETCH_SUCCESS:
      const decoratedNotifications = payload.data.map((n: INotification) => ({
        ...n,
        updatedAt: moment(n.updatedAt),
        createdAt: moment(n.createdAt)
      }))
      return {
        ...state,
        loading: false,
        notifications: decoratedNotifications
      }
    case READ_NOTIFICATION: {
      const modifiedNotifications = state.notifications.map(n => {
        if (n.notificationId === payload && n.status !== 'Actioned') {
          return {
            ...n,
            status: 'Read'
          }
        }
        return n
      })
      return {
        ...state,
        notifications: modifiedNotifications
      }
    }
    case ACTIONED_NOTIFICATION: {
      const modifiedNotifications = _.cloneDeep(state.notifications)
      const itemToRemove = modifiedNotifications.findIndex(
        n => n.notificationId === payload
      )

      modifiedNotifications.splice(itemToRemove, 1)

      return {
        ...state,
        notifications: modifiedNotifications
      }
    }
    default:
      return state
  }
}
