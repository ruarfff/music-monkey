import http from '../http'
import IUser from './IUser'

export const getUserById = async (userId: string) => {
  const response = await http.get('/users/' + userId, {
    withCredentials: true
  })
  return response
}

export const getCurrentUser = async () => {
  const response = await http.post('/users/me', {
    withCredentials: true
  })
  return response
}

export const updateUserById = async (user: IUser) => {
  const res = await http.put('/users/' + user.userId, user, {
    withCredentials: true
  })
  return res
}
