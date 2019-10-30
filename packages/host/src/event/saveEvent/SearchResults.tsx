import React from 'react'
import { List } from '@material-ui/core'
import ITrack from 'track/ITrack'
import TrackItem from './TrackItem'

interface SearchResultsProps {
  searchedTracks: ITrack[]
  filterList: ITrack[]
  onTrackSelected(track: ITrack): void
}

const SearchResults = ({
  searchedTracks,
  filterList,
  onTrackSelected
}: SearchResultsProps) => {
  const existingTracks = filterList.map(track => track.uri)
  let tracks: ITrack[] = searchedTracks.filter(
    track => existingTracks.indexOf(track.uri) === -1
  )
  return (
    <List>
      {tracks.map(track => (
        <TrackItem onSelected={onTrackSelected} track={track} key={track.uri} />
      ))}
    </List>
  )
}

export default SearchResults
