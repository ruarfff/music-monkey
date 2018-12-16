import http from '../http'

export const loginWithCookie = async () => {
  const response = await http.get('/auth/verify', {
    withCredentials: true,
    cache: false
  } as any)
  return response.data
}

export const logout = async () => {
  await http.get('/auth/logout', {
    withCredentials: true,
    cache: false
  } as any)
}
