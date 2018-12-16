import client from 'music-monkey-client'

export const loginWithCookie = async () => {
  const response = await client.get('/auth/verify', {
    withCredentials: true,
    cache: false
  } as any)
  return response.data
}

export const loginWithCredentials = async (credentials: any) => {
  const response = await client.post('/auth/login', credentials, {
    withCredentials: true
  })
  return response.data
}

export const loginAsGuest = async () => {
  const response = await client.post(
    '/auth/login-guest',
    {},
    { withCredentials: true }
  )
  return response.data
}

export const logout = async () => {
  await client.get('/auth/logout', {
    withCredentials: true,
    cache: false
  } as any)
}

export const signUp = async (credentials: any) => {
  const response = await client.post('/auth/signup', credentials, {
    withCredentials: true
  })
  return response.data
}
