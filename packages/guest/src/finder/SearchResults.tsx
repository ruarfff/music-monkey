import { List } from '@material-ui/core'
import * as React from 'react'
import ITrack from '../track/ITrack'
import TrackList from '../track/TrackList'

interface ISearchResultsProps {
  tracks: ITrack[]
  onTrackSelected(track: ITrack): any
}
const SearchResults = ({ tracks, onTrackSelected }: ISearchResultsProps) => {
  return (
    <List>
      <TrackList
        tracks={tracks}
        withSuggestingEnabled={true}
        onTrackSelected={onTrackSelected}
      />
    </List>
  )
}

export default SearchResults
