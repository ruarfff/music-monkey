import React, { FC } from 'react'
import { Track, TrackList } from 'mm-shared'

interface SearchResultsProps {
  tracks: Track[]
  onSelected(track: Track): any
}
const SearchResults: FC<SearchResultsProps> = ({ tracks, onSelected }) => {
  return (
    <TrackList
      tracks={tracks}
      onSelected={onSelected}
      options={{ canRequest: true }}
    />
  )
}

export default SearchResults
