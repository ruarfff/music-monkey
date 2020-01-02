import { List } from '@material-ui/core'
import * as React from 'react'
import { Track }  from 'mm-shared'
import TrackList from '../track/TrackList'

interface ISearchResultsProps {
  tracks: Track[]
  onTrackSelected(track: Track): any
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
