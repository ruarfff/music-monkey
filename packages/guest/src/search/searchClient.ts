import http from '../http'

export const search = async (searchTerm: string) => {
  const response = await http.get(
    '/search?q=' + encodeURIComponent(searchTerm) + '&type=track',
    {
      withCredentials: true
    }
  )
  return response.data
}
