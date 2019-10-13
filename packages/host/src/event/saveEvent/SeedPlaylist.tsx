import React, { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import Button from '@material-ui/core/Button'
import GridList from '@material-ui/core/GridList'
import Divider from '@material-ui/core/Divider'
import IUser from 'user/IUser'
import IAction from 'IAction'
import IPlaylist from 'playlist/IPlaylist'
import SmallPlaylistCard from 'catalogue/SmallPlaylistCard'
import LoadingSpinner from 'loading/LoadingSpinner'
import './SeedPlaylist.scss'

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
      {playlistsLoading ? (
        <div className="SeedPlaylist-loading-area">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="SeedPlaylist-grid-list-container">
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
                  <SmallPlaylistCard
                    playlist={playlist}
                    classes={{ root: 'SeedPlaylist-playlist-card' }}
                  />
                </div>
              ))}
          </GridList>
        </div>
      )}

      <div className="SeedPlaylist-actions">
        {!!selectedPlaylist && (
          <div>
            <Divider variant="fullWidth" />
            <Typography variant="subtitle1" align="center">
              You have selected {selectedPlaylist.name}
            </Typography>
            <Divider variant="fullWidth" />
          </div>
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
