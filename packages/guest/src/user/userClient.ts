import http from '../http'
import IUser from './IUser'

export const updateUserById = async (user: IUser) => {
  const res = await http.put('/users/' + user.userId, user, {
    withCredentials: true
  })
  return res
}
