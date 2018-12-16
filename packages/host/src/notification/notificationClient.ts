import http from '../http'
import { INotification } from './notificationInitialState'

export const getNotifications = async (userId: string) => {
  const response = await http
    .get('/notifications/' + userId, {
      withCredentials: true
    });
  return response;
}

export const updateNotification = async (notification: INotification) => {
  const updatedNotification = await http
    .put('/notifications/' + notification.notificationId,
      { ...notification },
      {withCredentials: true}
      );
  return updatedNotification
}