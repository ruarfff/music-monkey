import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Search from '@material-ui/icons/Search'
import { debounce, isEmpty } from 'lodash'
import React, { useState } from 'react'
import IAction from '../../IAction'
import IPlaylist from '../../playlist/IPlaylist'
import ISearch from '../../playlist/ISearch'
import Recommendations from '../../recommendations/RecommendationsContainer'
import ITrack from '../../track/ITrack'
import EventInput from '../EventInput/EventInput'
import './EventSearchTracks.scss'
import TrackItem from './TrackItem'

const WAIT_INTERVAL = 400

interface IEventSearchTracksProps {
  searchResult: ISearch
  playlist: IPlaylist
  notification: string
  layout?: string
  searchTrack(text: string): IAction
  addTrack(playlistId: string, track: ITrack): IAction
}

const EventSearchTracks = ({
  searchTrack,
  searchResult,
  addTrack,
  playlist,
  layout
}: IEventSearchTracksProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const timer: any = debounce(() => triggerChange(), WAIT_INTERVAL)

  const handleSearchSubmit = () => {
    searchTrack(searchQuery)
  }

  const handleSearchChange = (searchQuery: string) => {
    setSearchQuery(searchQuery)

    timer()
  }

  const handleClearSearch = () => {
    setSearchQuery('')
  }

  const triggerChange = () => {
    if (searchQuery !== '') {
      searchTrack(searchQuery)
    }
  }

  const playlistTracks = playlist.tracks.items.map(track => track.track.uri)

  let filteredSearch

  if (!isEmpty(searchResult)) {
    filteredSearch = searchResult.items.filter(
      searchedTrack => playlistTracks.indexOf(searchedTrack.uri) === -1
    )
  }

  return (
    <div>
      <div className="SearchSection">
        <EventInput
          value={searchQuery}
          label={'search'}
          onChange={handleSearchChange}
        />
        <Button
          className="EventSearchTracks-button"
          onClick={handleSearchSubmit}
        >
          <Search />
        </Button>
      </div>

      <div className="SearchResults">
        <List>
          {filteredSearch ? (
            filteredSearch.map((track, index) => (
              <TrackItem
                layout={layout}
                handleClearSearch={handleClearSearch}
                playlistId={playlist.id}
                addTrack={addTrack}
                track={track}
                key={index}
              />
            ))
          ) : (
            <Recommendations playlist={playlist} layout={layout} />
          )}
        </List>
      </div>
    </div>
  )
}

export default EventSearchTracks
