import client from 'music-monkey-client'
import IUser from './IUser'

export const updateUserById = async (user: IUser) => {
  const res = await client.put('/users/' + user.userId, user, {
    withCredentials: true
  })
  return res
}
