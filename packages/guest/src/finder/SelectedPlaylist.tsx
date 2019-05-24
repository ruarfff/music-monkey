import { Button, Icon } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { Link } from 'react-router-dom'
import Images from '../img/ImportImg'
import IPlaylist from '../playlist/IPlaylist'
import IPlaylistItem from '../playlist/IPlaylistItem'
import ITrack from '../track/ITrack'
import TrackList from '../track/TrackList'
import React from 'react'

interface ISelectedPlaylistProps {
  playlist: IPlaylist
  onAddAll(): void
  onTrackSelected(track: ITrack): void
}

const SelectedPlaylist = ({
  playlist,
  onAddAll,
  onTrackSelected
}: ISelectedPlaylistProps) => {
  return (
    <div>
      <div className="finder-playlist-header">
        <div className="finder-playlist-img">
          <img alt="playlist" src={Images.Playlist} />
        </div>
        <div className="finder-playlist-container">
          <div className="finder-playlist-container-top">
            <Link to="/finder">
              <Icon>keyboard_backspace</Icon>
            </Link>
          </div>
          <div className="finder-playlist-container-title">
            {playlist.name} <br />
            {playlist.tracks.total} {' Tracks'}
          </div>
          <div className="finder-playlist-container-button">
            <Button
              variant="fab"
              color="primary"
              className="finder-playlist-header-container-button"
              onClick={onAddAll}
            >
              <AddIcon />
            </Button>
            <span className="finder-playlist-header-container-button-label">
              Add All
            </span>
          </div>
        </div>
      </div>
      <TrackList
        tracks={playlist.tracks.items.map((item: IPlaylistItem) => item.track)}
        withSuggestingEnabled={true}
        onTrackSelected={onTrackSelected}
      />
    </div>
  )
}

export default SelectedPlaylist
