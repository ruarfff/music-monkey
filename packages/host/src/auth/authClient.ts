import client from 'music-monkey-client'

export const loginWithCookie = async () => {
  const response = await client.get('/auth/verify', {
    withCredentials: true,
    cache: false
  } as any)
  return response.data
}

export const logout = async () => {
  await client.get('/auth/logout', {
    withCredentials: true,
    cache: false
  } as any)
}
