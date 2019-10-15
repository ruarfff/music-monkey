import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Search from '@material-ui/icons/Search'
import { debounce, isEmpty } from 'lodash'
import IAction from 'IAction'
import ISearch from 'playlist/ISearch'
import ITrack from 'track/ITrack'
import EventInput from 'components/EventInput/EventInput'
import TrackItem from './TrackItem'
import './SelectTracks.scss'

const WAIT_INTERVAL = 200

interface SelectTracksProps {
  searchResult: ISearch
  recommendedTracks: ITrack[]
  filterList: ITrack[]
  onTrackSelected(track: ITrack): void
  searchTrack(text: string): IAction
  getRecommendations(): IAction
}

const SelectTracks = ({
  searchResult,
  recommendedTracks = [],
  filterList = [],
  onTrackSelected,
  searchTrack,
  getRecommendations
}: SelectTracksProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const timer: any = debounce(() => triggerChange(), WAIT_INTERVAL)
  const handleSearchChange = (searchQuery: string) => {
    setSearchQuery(searchQuery)
    timer()
  }
  const triggerChange = () => {
    if (searchQuery !== '') {
      searchTrack(searchQuery)
    }
  }
  const existingTracks = filterList.map(track => track.uri)

  useEffect(() => {
    if (isEmpty(recommendedTracks)) {
      getRecommendations()
    }
  }, [getRecommendations, recommendedTracks])

  let tracks: ITrack[] = []

  if (!isEmpty(searchResult)) {
    tracks = searchResult.items.filter(
      track => existingTracks.indexOf(track.uri) === -1
    )
  } else {
    tracks = recommendedTracks.filter(
      track => existingTracks.indexOf(track.uri) === -1
    )
  }

  return (
    <div className="SelectTracks-root">
      <div className="SelectTracks-section">
        <EventInput
          value={searchQuery}
          label="Search"
          onChange={handleSearchChange}
        />
        <Button
          onClick={() => {
            searchTrack(searchQuery)
          }}
        >
          <Search />
        </Button>
      </div>

      <div>
        <List>
          {tracks.map(track => (
            <TrackItem
              onSelected={onTrackSelected}
              track={track}
              key={track.uri}
            />
          ))}
        </List>
      </div>
    </div>
  )
}

export default SelectTracks
