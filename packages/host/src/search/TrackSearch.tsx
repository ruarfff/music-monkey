import React, { useState, useEffect } from 'react'
import { Paper, InputBase, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/Clear'
import isEmpty from 'lodash/isEmpty'
import ITrack from 'track/ITrack'
import useDebounce from 'util/useDebounce'
import { searchTracks } from 'search/searchClient'
import TrackSearchResult from './TrackSearchResult'
import './TrackSearch.scss'

interface TrackSearchProps {
  onFocus(): void
  onSearchStart(): void
  onSearchResult(tracks: ITrack[]): void
}

const TrackSearch = ({
  onSearchStart,
  onSearchResult,
  onFocus
}: TrackSearchProps) => {
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
        fullWidth
        className="TrackSearch-input"
        placeholder="Search For Tracks"
        inputProps={{ 'aria-label': 'search for tracks' }}
        onChange={(event: any) => {
          const query = !!event.target ? event.target.value : ''
          setSearchQuery(query)
        }}
        onFocus={onFocus}
        value={searchQuery}
      />
      <IconButton
        className="TrackSearch-icon-button"
        aria-label="search"
        onClick={() => {
          if (!!searchQuery) setSearchQuery('')
        }}
      >
        {!!searchQuery ? <ClearIcon /> : <SearchIcon />}
      </IconButton>
    </Paper>
  )
}

export default TrackSearch
