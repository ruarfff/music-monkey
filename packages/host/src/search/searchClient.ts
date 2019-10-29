import client from 'music-monkey-client'
import TrackSearchResult from './TrackSearchResult'

export const searchTracks = async (searchTerm: string) => {
  const response = await client.get(
    '/search?q=' + encodeURIComponent(searchTerm) + '&type=track',
    {
      withCredentials: true
    }
  )

  const searchResult: TrackSearchResult = response.data.tracks
  return searchResult
}
