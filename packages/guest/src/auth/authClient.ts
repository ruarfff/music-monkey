import http from '../http'

export const loginWithCookie = async () => {
  const response = await http.get('/auth/verify', {
    withCredentials: true,
    cache: false
  } as any)
  return response.data
}

export const loginWithCredentials = async (credentials: any) => {
  const response = await http.post('/auth/login', credentials, {
    withCredentials: true
  })
  return response.data
}

export const loginAsGuest = async () => {
  const response = await http.post(
    '/auth/login-guest',
    {},
    { withCredentials: true }
  )
  return response.data
}

export const logout = async () => {
  await http.get('/auth/logout', {
    withCredentials: true,
    cache: false
  } as any)
}

export const signUp = async (credentials: any) => {
  const response = await http.post('/auth/signup', credentials, {
    withCredentials: true
  })
  return response.data
}
