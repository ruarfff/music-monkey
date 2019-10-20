import React, { useState, useEffect } from 'react'
import { Paper, InputBase, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import ITrack from 'track/ITrack'
import useDebounce from 'util/useDebounce'
import { searchTracks } from 'search/searchClient'
import TrackSearchResult from './TrackSearchResult'
import './TrackSearch.scss'
import isEmpty from 'lodash/isEmpty'

interface TrackSearchProps {
  onSearchStart(): void
  onSearchResult(tracks: ITrack[]): void
}

const TrackSearch = ({ onSearchStart, onSearchResult }: TrackSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebounce(searchQuery, 400)

  useEffect(() => {
    const search = async (searchTerm: string) => {
      if (isEmpty(searchTerm)) {
        onSearchResult([])
      } else {
        try {
          onSearchStart()
          const searchResult: TrackSearchResult = await searchTracks(searchTerm)          
          onSearchResult(searchResult.items)
        } catch (err) {
          onSearchResult([])
        }
      }
    }

    search(debouncedSearchQuery)

    // eslint-disable-next-line
  }, [debouncedSearchQuery])

  return (
    <Paper className="TrackSearch-root">
      <InputBase
        className="TrackSearch-input"
        placeholder="Search For Tracks"
        inputProps={{ 'aria-label': 'search for tracks' }}
        onChange={(event: any) => {
          const query = !!event.target ? event.target.value : ''
          setSearchQuery(query)
        }}
        value={searchQuery}
      />
      <IconButton className="TrackSearch-icon-button" aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default TrackSearch
