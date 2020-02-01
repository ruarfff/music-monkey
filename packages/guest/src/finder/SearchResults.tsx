import React, { FC } from 'react'
import { Track, TrackList } from 'mm-shared'

interface SearchResultsProps {
  tracks: Track[]
  onTrackSelected(track: Track): any
}
const SearchResults: FC<SearchResultsProps> = ({ tracks, onTrackSelected }) => {
  return (
    <TrackList
      tracks={tracks}
      withSuggestingEnabled={true}
      onTrackSelected={onTrackSelected}
    />
  )
}

export default SearchResults
