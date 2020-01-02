import client from 'mm-client'
import { User } from 'mm-shared'

export const getUserById = async (userId: User) => {
  const res = await client.get('/users/' + userId, {
    withCredentials: true
  })

  return res
}

export const updateUserById = async (user: User) => {
  const res = await client.put('/users/' + user.userId, user, {
    withCredentials: true
  })
  return res
}
