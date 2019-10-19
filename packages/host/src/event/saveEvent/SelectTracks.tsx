import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Search from '@material-ui/icons/Search'
import {
  FormControl,  
  Input,
  InputLabel
} from '@material-ui/core'
import isEmpty from 'lodash/isEmpty'
import IAction from 'IAction'
import ISearch from 'playlist/ISearch'
import ITrack from 'track/ITrack'
import TrackItem from './TrackItem'
import useDebounce from 'util/useDebounce'
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
  const debouncedSearchQuery = useDebounce(searchQuery, WAIT_INTERVAL);

  const existingTracks = filterList.map(track => track.uri)

  useEffect(() => {
    if (isEmpty(recommendedTracks)) {
      getRecommendations()
    }

    if (debouncedSearchQuery) {
      searchTrack(searchQuery)
    } 

    // eslint-disable-next-line
  }, [searchQuery, debouncedSearchQuery])

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
      <FormControl fullWidth>
          <InputLabel
            htmlFor="search-tracks"            
          >
            Search
          </InputLabel>

          <Input
            id="search-tracks"
            aria-describedby="Search Tracks"
            autoFocus                                    
            onChange={(event: any) => {              
              setSearchQuery(event.target.value)
            }}
            value={searchQuery}
          />          
        </FormControl>
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
