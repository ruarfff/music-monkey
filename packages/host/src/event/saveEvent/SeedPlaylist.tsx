import React, { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import Button from '@material-ui/core/Button'
import GridList from '@material-ui/core/GridList'
import IUser from 'user/IUser'
import IAction from 'IAction'
import IPlaylist from 'playlist/IPlaylist'
import SmallPlaylistCard from 'catalogue/SmallPlaylistCard'
import './SeedPlaylist.scss'
import LoadingSpinner from 'loading/LoadingSpinner'

interface SeedPlaylistProps {
  user: IUser
  playlists: IPlaylist[]
  playlistsLoading: boolean
  fetchPlaylists(user: IUser): IAction
  handleNext(): void
  handleBack(): void
  onPlaylistSelected(playlist: IPlaylist): void
}

const SeedPlaylist = ({
  user,
  playlists,
  playlistsLoading,
  fetchPlaylists,
  onPlaylistSelected,
  handleBack,
  handleNext
}: SeedPlaylistProps) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState()
  useEffect(() => {
    if (isEmpty(playlists) && !playlistsLoading) {
      fetchPlaylists(user)
    }
  }, [fetchPlaylists, playlists, playlistsLoading, user])
  return (
    <div className="SeedPlaylist-root">
      <Typography>
        Select a playlist to seed the Event. You can{' '}
        <Button onClick={() => handleNext()}>Skip this step</Button> to start
        with an empty playlist.
      </Typography>
      <div className="SeedPlaylist-grid-list-container">
        {playlistsLoading ? (
          <LoadingSpinner />
        ) : (
          <GridList cols={2.5} className="SeedPlaylist-grid-list">
            {playlists
              .filter((playlist: IPlaylist) => playlist.tracks.total > 0)
              .map((playlist: IPlaylist) => (
                <div
                  key={playlist.id}
                  onClick={() => {
                    setSelectedPlaylist(playlist)
                  }}
                  className={`SeedPlaylist-playlist ${
                    !!selectedPlaylist && selectedPlaylist.id === playlist.id
                      ? 'SeedPlaylist-playlist-selected'
                      : ''
                  }`}
                >
                  <SmallPlaylistCard playlist={playlist} />
                </div>
              ))}
          </GridList>
        )}
      </div>

      <div className="SeedPlaylist-actions">
        {!!selectedPlaylist && (
          <Typography>You have selected {selectedPlaylist.name}</Typography>
        )}
        <FormGroup className="SaveEvent-form-actions">
          {!!selectedPlaylist && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setSelectedPlaylist(undefined)
              }}
            >
              Clear Selection
            </Button>
          )}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              handleBack()
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (!!selectedPlaylist) {
                onPlaylistSelected(selectedPlaylist)
              } else {
                handleNext()
              }
            }}
          >
            Next
          </Button>
        </FormGroup>
      </div>
    </div>
  )
}

export default SeedPlaylist
