import client from 'music-monkey-client'

export const search = async (searchTerm: string) => {
  const response = await client.get(
    '/search?q=' + encodeURIComponent(searchTerm) + '&type=track',
    {
      withCredentials: true
    }
  )
  return response.data
}
