import client from 'mm-client'
import { INotification } from './notificationInitialState'

export const getNotifications = async (userId: string) => {
  const response = await client.get('/notifications/' + userId, {
    withCredentials: true
  })
  return response
}

export const updateNotification = async (notification: INotification) => {
  const updatedNotification = await client.put(
    '/notifications/' + notification.notificationId,
    { ...notification },
    { withCredentials: true }
  )
  return updatedNotification
}
