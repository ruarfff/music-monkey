import client from 'mm-client'
import { User } from './User'

export const getUserById = async (userId: string) => {
  const response = await client.get('/users/' + userId, {
    withCredentials: true
  })
  return response
}

export const getCurrentUser = async () => {
  const response = await client.post('/users/me', {
    withCredentials: true
  })
  return response
}

export const updateUserById = async (user: User) => {
  const res = await client.put('/users/' + user.userId, user, {
    withCredentials: true
  })
  return res
}
