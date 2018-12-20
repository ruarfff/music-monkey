import client from 'music-monkey-client'
import IUser from './IUser'

export const getUserById = async (userId: IUser) => {
  const res = await client.get('/users/' + userId, {
    withCredentials: true
  })

  return res
}

export const updateUserById = async (user: IUser) => {
  const res = await client.put('/users/' + user.userId, user, {
    withCredentials: true
  })
  return res
}
