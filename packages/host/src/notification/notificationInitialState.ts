import { Moment } from 'moment'

export interface INotification {
  userId: string,
  type: string,
  context: string,
  contextId: string,
  text: string,
  content: string
  status: string
  notificationId: string
  updatedAt: any
  createdAt: Moment
}


export interface INotificationState {
  error: string
  loading: boolean
  notifications: INotification[]
}

export default {
  error: '',
  loading: false,
  notifications: []
} as INotificationState
